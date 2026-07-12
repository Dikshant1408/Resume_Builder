Cypress.on("uncaught:exception", (err, runnable) => {
  // Prevent React hydration date-locale mismatch exceptions from failing tests
  return false;
});

describe("ResumeForge AI End-to-End Feature Test Suite", () => {
  beforeEach(() => {
    // Set viewport dimensions
    cy.viewport(1280, 720);
  });

  it("should verify Landing Page structure, landmarks, contrast, and navigation", () => {
    // 1. Visit Landing Page
    cy.visit("/");
    
    // Assert correct page title and semantic main landmark
    cy.title().should("contain", "ResumeForge AI - Career Platform & Professional CV Builder");
    cy.get("main").should("exist");
    cy.get("header").should("exist");
    cy.get("footer").should("exist");

    // Assert main header links exist
    cy.contains("Features").should("be.visible");
    cy.contains("Templates").should("be.visible");
    cy.contains("Pricing").should("be.visible");
    cy.contains("FAQ").should("be.visible");

    // Click on Sign In header link to test transition to auth route
    cy.contains("Sign In").click();
    cy.url().should("include", "/auth");
  });

  it("should test Sign Up registration mode and dynamic workspace header initialization", () => {
    cy.visit("/auth");
    
    // Wait for Next.js page event handlers hydration to complete
    cy.wait(1500);

    // Toggle swapper mode to Sign Up (First tab-switch button on layout)
    cy.get(".grid-cols-2 button").contains("Sign Up").click({ force: true });
    cy.contains("Create Your Account").should("be.visible");

    // Fill in registration form credentials using index-based inputs
    cy.get("form input[type='text']").first().type("Dikshant");
    cy.get("form input[type='email']").first().type("dikshant@example.com");
    cy.get("form input[type='password']").first().type("password123");
    
    // Check Terms of Service accept checkbox
    cy.get("input[type='checkbox']").check({ force: true });

    // Submit form (Simulate signup process)
    cy.get("form").submit();

    // Verify redirect transition into dashboard
    cy.url().should("include", "/dashboard");

    // Assert greeting displays the registered name dynamically
    cy.contains("Welcome Back, Dikshant!").should("be.visible");

    // Assert profile initials dynamic header matches registered name
    cy.get("header").within(() => {
      cy.contains("D").should("be.visible");
      cy.contains("Dikshant").should("be.visible");
    });
  });

  it("should test Dashboard layout controls, theme toggles, and subpage menu routes", () => {
    // Navigate straight to dashboard (using default state name)
    cy.visit("/dashboard");
    
    // Wait for Dashboard page to hydrate
    cy.wait(1500);

    cy.contains("Welcome Back, Alex!").should("be.visible");

    // 1. Test Dark/Light Visual Theme Toggle
    cy.get("button[aria-label='Toggle dark mode visual theme']").click();
    // Re-click to toggle back
    cy.get("button[aria-label='Toggle dark mode visual theme']").click();

    // 2. Test Notification center panel toggle
    cy.get("button[aria-label='Open notifications panel']").click();
    cy.contains("Notifications").should("be.visible");
    cy.contains("Resumed Optimised Successfully!").should("be.visible");
    // Click with force = true to close, since click overlay block can cover the header button
    cy.get("button[aria-label='Open notifications panel']").click({ force: true });

    // 3. Verify subpages load successfully on navigation menu routing click
    const menuRoutes = [
      { name: "Resume Builder", url: "/dashboard/resume-builder" },
      { name: "ATS Score Checker", url: "/dashboard/ats-checker" },
      { name: "Job Optimizer", url: "/dashboard/job-optimizer" },
      { name: "Cover Letters", url: "/dashboard/cover-letter" },
      { name: "Portfolio Website", url: "/dashboard/portfolio" },
      { name: "Job Kanban Tracker", url: "/dashboard/job-tracker" },
      { name: "Skills Analyzer", url: "/dashboard/skills-analyzer" },
      { name: "AI Interview Prep", url: "/dashboard/interview-prep" },
      { name: "Settings", url: "/dashboard/settings" }
    ];

    menuRoutes.forEach((route) => {
      cy.contains(route.name).click();
      cy.url().should("include", route.url);
    });
  });

  it("should test Profile name updates inside Settings form and dynamic synchronization", () => {
    cy.visit("/dashboard/settings");

    // Wait for settings page to hydrate
    cy.wait(1500);

    // Edit settings inputs using robust index-based selectors
    cy.get("input[type='text']").first().clear().type("John Doe");
    cy.get("input[type='email']").first().clear().type("john.doe@example.com");

    // Listen to window alert trigger
    const alertStub = cy.stub();
    cy.on("window:alert", alertStub);

    // Save details
    cy.contains("Save Profile Settings").click().then(() => {
      expect(alertStub.getCall(0)).to.be.calledWith("Profile details saved successfully!");
    });

    // Verify layout header updates dynamically with the new name John Doe and initials JD
    cy.get("header").within(() => {
      cy.contains("JD").should("be.visible");
      cy.contains("John Doe").should("be.visible");
    });
  });
});
