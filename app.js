// Simulación de base de datos en localStorage
let users = JSON.parse(localStorage.getItem('users')) || [];
let gastos = JSON.parse(localStorage.getItem('gastos')) || [];

// Referencias de elementos del DOM
const loginSection = document.getElementById('login-register');
const expenseSection = document.getElementById('expense-section');
const loginForm = document.getElementById('loginForm');
const registerBtn = document.getElementById('registerBtn');
const expenseForm = document.getElementById('expenseForm');
const filterForm = document.getElementById('filterForm');
const gastosTableBody = document.querySelector('#gastosTable tbody');

// Función para mostrar la tabla de gastos
function displayGastos(gastosFiltrados = gastos) {
    gastosTableBody.innerHTML = '';
    gastosFiltrados.forEach(gasto => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${gasto.concepto}</td>
            <td>${gasto.monto}</td>
            <td>${gasto.fecha}</td>
            <td>${gasto.categoria}</td>
        `;
        gastosTableBody.appendChild(row);
    });
}

// Inicio de sesión
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        alert('Sesión iniciada');
        loginSection.style.display = 'none';
        expenseSection.style.display = 'block';
        displayGastos();
    } else {
        alert('Usuario o contraseña incorrectos');
    }
});

// Registro de usuario
registerBtn.addEventListener('click', () => {
    const username = prompt('Ingresa tu nombre de usuario');
    const password = prompt('Ingresa una contraseña (mínimo 4 caracteres)');

    if (username && password && password.length >= 4) {
        users.push({ username, password });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Usuario registrado con éxito');
    } else {
        alert('La contraseña debe tener al menos 4 caracteres');
    }
});

// Agregar gasto
expenseForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const concepto = document.getElementById('concepto').value;
    const monto = parseFloat(document.getElementById('monto').value);
    const fecha = document.getElementById('fecha').value;
    const categoria = document.getElementById('categoria').value;

    const gasto = { concepto, monto, fecha, categoria };
    gastos.push(gasto);
    localStorage.setItem('gastos', JSON.stringify(gastos));

    displayGastos();
    alert('Gasto registrado');
    expenseForm.reset();
});

// Filtrar gastos
filterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const filterCategoria = document.getElementById('filterCategoria').value;
    const fechaDesde = document.getElementById('fechaDesde').value;
    const fechaHasta = document.getElementById('fechaHasta').value;

    let gastosFiltrados = gastos;

    if (filterCategoria !== 'todos') {
        gastosFiltrados = gastosFiltrados.filter(gasto => gasto.categoria === filterCategoria);
    }

    if (fechaDesde) {
        gastosFiltrados = gastosFiltrados.filter(gasto => new Date(gasto.fecha) >= new Date(fechaDesde));
    }

    if (fechaHasta) {
        gastosFiltrados = gastosFiltrados.filter(gasto => new Date(gasto.fecha) <= new Date(fechaHasta));
    }

    displayGastos(gastosFiltrados);
});
