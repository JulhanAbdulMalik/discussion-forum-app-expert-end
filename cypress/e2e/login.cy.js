/**
 * - Login spec
 * - should display login page correctly
 * - should display alert when email is empty
 * - should display alert when password is empty
 * - should display alert when email and password are wrong
 * - should display homepage when email and password are correct
 */

describe('Login spec', () => {
  // Selalu mengunjungi halaman login sebelum setiap tes dijalankan
  beforeEach(() => {
    cy.visit('http://localhost:5173/login');
  });

  // Skenario 1 : Memverifikasi elemen yang harus tampak pada halaman login
  it('should display login page correctly', () => {
    cy.get('input#email').should('be.visible');
    cy.get('input#password').should('be.visible');
    cy.get('button')
      .contains(/^Masuk$/)
      .should('be.visible');
  });

  // Skenario 2 : Memverifikasi alert ketika email kosong
  it('should display alert when email is empty', () => {
    // Menekan tombol Masuk
    cy.get('button')
      .contains(/^Masuk$/)
      .click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"email" is not allowed to be empty');
    });
  });

  // Skenario 3 : Memverifikasi alert ketika password kosong
  it('should display alert when password is empty', () => {
    // Mengisi email
    cy.get('input#email').type('user@example.com');

    // Menekan tombol Masuk
    cy.get('button')
      .contains(/^Masuk$/)
      .click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"password" is not allowed to be empty');
    });
  });

  // Skenario 4 : Memverifikasi alert ketika email dan password salah
  it('should display alert when email and password are wrong', () => {
    // Mengisi email
    cy.get('input#email').type('wronguser@example.com');

    // Mengisi password yang salah
    cy.get('input#password').type('wrongpassword');

    // Menekan tombol Masuk
    cy.get('button')
      .contains(/^Masuk$/)
      .click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('email or password is wrong');
    });
  });

  // Skenario 5 : Memverifikasi halaman utama ketika email dan password benar
  it('should display homepage when email and password are correct', () => {
    // Mengisi email yang benar
    cy.get('input#email').type('admin-j@gmail.com');

    // Mengisi password yang benar
    cy.get('input#password').type('admin123');

    // Menekan tombol Masuk
    cy.get('button')
      .contains(/^Masuk$/)
      .click();

    // Memverifikasi bahwa URL telah berubah ke halaman utama
    cy.url().should('not.include', '/login');
  });
});
