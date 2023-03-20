describe("Notes component", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000"); // replace with the URL of your app
  });

  it("should display a list of notes", () => {
    cy.get(".notes-list tbody tr").should("have.length.greaterThan", 0);
  });

  it("should allow adding a new note", () => {
    cy.get("#title").type("New note");
    cy.get("#content").type("This is a new note");
    cy.contains("Add note").click();
    cy.get(".notes-list tbody tr:last-child td:first-child").should(
      "have.text",
      "New note"
    );
  });

  it("should allow updating a note", () => {
    cy.get(".notes-list tbody tr:first-child .btn-primary").click();
    cy.get("#title").clear().type("Updated note");
    cy.get("#content").clear().type("This note has been updated");
    cy.contains("Update note").click();
    cy.get(".notes-list tbody tr:first-child td:first-child").should(
      "have.text",
      "Updated note"
    );
  });

  it("should allow deleting a note", () => {
    cy.get(".notes-list tbody tr:last-child .btn-danger").click();
    cy.get(".notes-list tbody tr").should("have.length.lessThan", 4);
  });
});
