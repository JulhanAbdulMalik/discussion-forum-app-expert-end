/**
 * - Register spec
 * - should display register page correctly
 * - should display alert when name is empty
 * - should display alert when email is empty
 * - should display alert when password is empty
 * - should display alert when email is already taken
 * - should display login page when registration is successful
 */

describe('Register spec', () => {
  // Selalu kunjungi halaman registrasi sebelum setiap tes dijalankan
  beforeEach(() => {
    cy.visit('http://localhost:5173/register');
  });

  // Skenario 1 : Memverifikasi elemen yang harus tampak pada halaman register
  it('should display register page correctly', () => {
    cy.get('input#name').should('be.visible');
    cy.get('input#email').should('be.visible');
    cy.get('input#password').should('be.visible');
    cy.get('button')
      .contains(/^Daftar$/)
      .should('be.visible');
  });

  // Skenario 2 : Memverifikasi alert ketika nama kosong
  it('should display alert when name is empty', () => {
    // Menekan tombol Daftar
    cy.get('button')
      .contains(/^Daftar$/)
      .click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"name" is not allowed to be empty');
    });
  });

  // Skenario 3 : Memverifikasi alert ketika email kosong
  it('should display alert when email is empty', () => {
    // Mengisi nama
    cy.get('input#name').type('Julhan Abdul Malik');

    // Menekan tombol Daftar
    cy.get('button')
      .contains(/^Daftar$/)
      .click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"email" is not allowed to be empty');
    });
  });

  // Skenario 4 : Memverifikasi alert ketika password kosong
  it('should display alert when password is empty', () => {
    // Mengisi nama dan email
    cy.get('input#name').type('Julhan Abdul Malik');
    cy.get('input#email').type('julhan@example.com');

    // Menekan tombol Daftar
    cy.get('button')
      .contains(/^Daftar$/)
      .click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"password" is not allowed to be empty');
    });
  });

  // Skenario 5 : Memverifikasi alert ketika email sudah terdaftar
  it('should display alert when email is already taken', () => {
    // Menggunakan email yang sudah terdaftar
    cy.get('input#name').type('Admin');
    cy.get('input#email').type('admin@gmail.com');
    cy.get('input#password').type('password123');

    // Menekan tombol Daftar
    cy.get('button')
      .contains(/^Daftar$/)
      .click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('email is already taken');
    });
  });

  // Skenario 6 : Memverifikasi halaman login ketika pendaftaran berhasil
  it('should display login page when registration is successful', () => {
    const timestamp = Date.now();
    const uniqueEmail = `julhan${timestamp}@example.com`;

    // Mengisi semua field dengan data valid
    cy.get('input#name').type('Julhan Abdul Malik');
    cy.get('input#email').type(uniqueEmail);
    cy.get('input#password').type('password123');

    // Menekan tombol Daftar
    cy.get('button')
      .contains(/^Daftar$/)
      .click();

    // Memverifikasi bahwa URL telah berubah ke halaman login
    cy.url().should('include', '/login');

    cy.get('h2').contains('Login').should('be.visible');
  });
});
