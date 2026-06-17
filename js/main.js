(() => {
  const init = () => {
    initTabs();
    initRevealAnimations();
    initFaqAccordion();
    initAdoptionQuickView();
    initFormEnhancements();
  };

  const activateTab = (tabs, targetTab) => {
    // Keep tab button state and linked panel visibility in sync.
    tabs.forEach((tab) => {
      const isActive = tab === targetTab;
      tab.setAttribute("aria-selected", String(isActive));
      tab.tabIndex = isActive ? 0 : -1;

      const panelId = tab.getAttribute("aria-controls");
      const panel = panelId ? document.getElementById(panelId) : null;
      if (panel) {
        panel.hidden = !isActive;
      }
    });
  };

  const nextTabIndex = (eventKey, index, length) => {
    // Support arrow/home/end keyboard navigation for accessibility.
    if (eventKey === "ArrowRight") {
      return (index + 1) % length;
    }

    if (eventKey === "ArrowLeft") {
      return (index - 1 + length) % length;
    }

    if (eventKey === "Home") {
      return 0;
    }

    if (eventKey === "End") {
      return length - 1;
    }

    return null;
  };

  const bindTabEvents = (tabs) => {
    // Bind click + keyboard handlers once for each tab list.
    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => activateTab(tabs, tab));

      tab.addEventListener("keydown", (event) => {
        const newIndex = nextTabIndex(event.key, index, tabs.length);
        if (newIndex === null) {
          return;
        }

        event.preventDefault();
        const nextTab = tabs[newIndex];
        activateTab(tabs, nextTab);
        nextTab.focus();
      });
    });
  };

  const initTabs = () => {
    const tabContainers = document.querySelectorAll("[data-tabs]");

    if (!tabContainers.length) {
      return;
    }

    tabContainers.forEach((container) => {
      const tabs = Array.from(container.querySelectorAll('[role="tab"]'));
      const panels = Array.from(container.querySelectorAll('[role="tabpanel"]'));

      bindTabEvents(tabs);

      // If markup does not mark a visible panel, default to first tab.
      if (!panels.some((panel) => !panel.hidden) && tabs.length) {
        activateTab(tabs, tabs[0]);
      }
    });
  };

  const prefersReducedMotion = () =>
    globalThis.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

  const initRevealAnimations = () => {
    const targets = document.querySelectorAll(
      ".panel, .card, .layout-section section, .layout-article section"
    );

    if (!targets.length) {
      return;
    }

    targets.forEach((item) => item.classList.add("reveal-item"));

    if (!("IntersectionObserver" in globalThis) || prefersReducedMotion()) {
      targets.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -30px 0px" }
    );

    targets.forEach((item) => observer.observe(item));
  };

  const closeOpenSiblings = (currentDetail) => {
    const parentSection = currentDetail.closest("section");
    if (!parentSection) {
      return;
    }

    const siblingDetails = parentSection.querySelectorAll("details[open]");
    siblingDetails.forEach((sibling) => {
      if (sibling !== currentDetail) {
        sibling.open = false;
      }
    });
  };

  const initFaqAccordion = () => {
    const allDetails = document.querySelectorAll("main details");

    if (!allDetails.length) {
      return;
    }

    allDetails.forEach((currentDetail) => {
      currentDetail.addEventListener("toggle", () => {
        if (currentDetail.open) {
          closeOpenSiblings(currentDetail);
        }
      });
    });
  };

  const buildModal = () => {
    const wrapper = document.createElement("div");
    wrapper.className = "pet-modal";
    wrapper.setAttribute("hidden", "");

    wrapper.innerHTML =
      '<div class="modal-backdrop" role="presentation">' +
      '<section class="modal-card" role="dialog" aria-modal="true" aria-labelledby="pet-modal-title">' +
      '<button type="button" class="modal-close" aria-label="Close quick view">x</button>' +
      '<img class="modal-image" src="" alt="" />' +
      '<h3 id="pet-modal-title" class="modal-title"></h3>' +
      '<p class="modal-meta"></p>' +
      '<p class="modal-description"></p>' +
      '<p><a href="enquiry.html">Continue to enquiry</a></p>' +
      "</section>" +
      "</div>";

    document.body.appendChild(wrapper);
    return wrapper;
  };

  const openModal = (modal, focusTarget) => {
    modal.removeAttribute("hidden");
    document.body.classList.add("modal-open");
    focusTarget?.focus();
  };

  const closeModal = (modal, lastFocusedElement) => {
    modal.setAttribute("hidden", "");
    document.body.classList.remove("modal-open");
    lastFocusedElement?.focus?.();
  };

  const initAdoptionQuickView = () => {
    const cards = document.querySelectorAll(".adoption-card");

    if (!cards.length) {
      return;
    }

    const modal = buildModal();
    const modalImage = modal.querySelector(".modal-image");
    const modalTitle = modal.querySelector(".modal-title");
    const modalMeta = modal.querySelector(".modal-meta");
    const modalDescription = modal.querySelector(".modal-description");
    const closeButton = modal.querySelector(".modal-close");
    const backdrop = modal.querySelector(".modal-backdrop");

    let lastFocusedElement = null;

    cards.forEach((card) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "quick-view-btn";
      button.textContent = "Quick View";

      button.addEventListener("click", () => {
        const title = card.querySelector("h4")?.textContent ?? "Pet profile";
        const image = card.querySelector("img");
        const paragraphs = card.querySelectorAll("p");
        const meta = paragraphs[0]?.textContent ?? "";
        const description = paragraphs[1]?.textContent ?? "";

        modalTitle.textContent = title.trim();
        modalMeta.textContent = meta.trim();
        modalDescription.textContent = description.trim();

        if (image) {
          modalImage.src = image.src;
          modalImage.alt = image.alt;
        } else {
          modalImage.removeAttribute("src");
          modalImage.alt = "";
        }

        lastFocusedElement = document.activeElement;
        openModal(modal, closeButton);
      });

      card.appendChild(button);
    });

    closeButton.addEventListener("click", () => closeModal(modal, lastFocusedElement));

    backdrop.addEventListener("click", (event) => {
      if (event.target === backdrop) {
        closeModal(modal, lastFocusedElement);
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !modal.hasAttribute("hidden")) {
        closeModal(modal, lastFocusedElement);
      }
    });
  };

  const addStatusRegion = (form) => {
    if (form.querySelector(".form-status")) {
      return;
    }

    const status = document.createElement("p");
    status.className = "form-status";
    status.setAttribute("aria-live", "polite");
    form.prepend(status);
  };

  const enhanceTextareaCounter = (form) => {
    const textareas = form.querySelectorAll("textarea");

    textareas.forEach((textarea) => {
      const counter = document.createElement("small");
      counter.className = "char-counter";
      textarea.after(counter);

      const updateCount = () => {
        counter.textContent = `${textarea.value.length} characters`;
      };

      textarea.addEventListener("input", updateCount);
      updateCount();
    });
  };

  const isRadioGroupValid = (form, field) => {
    const radioGroup = form.querySelectorAll(
      `input[type="radio"][name="${field.name}"]`
    );
    return Array.from(radioGroup).some((radio) => radio.checked);
  };

  const validateFormFields = (form) => {
    const fields = form.querySelectorAll("input, select, textarea");
    let firstInvalidField = null;

    fields.forEach((field) => {
      const invalid = field.type === "radio" && field.required
        ? !isRadioGroupValid(form, field)
        : !field.checkValidity();

      if (invalid) {
        field.classList.add("input-error");
        field.setAttribute("aria-invalid", "true");
        firstInvalidField ??= field;
      } else {
        field.classList.remove("input-error");
        field.removeAttribute("aria-invalid");
      }
    });

    return firstInvalidField;
  };

  const initFormEnhancements = () => {
    const forms = document.querySelectorAll("form");

    if (!forms.length) {
      return;
    }

    forms.forEach((form) => {
      enhanceTextareaCounter(form);
      addStatusRegion(form);

      form.addEventListener("submit", (event) => {
        const statusNode = form.querySelector(".form-status");
        const firstInvalidField = validateFormFields(form);

        if (firstInvalidField) {
          event.preventDefault();
          if (statusNode) {
            statusNode.textContent = "Please complete all required fields correctly.";
            statusNode.classList.add("is-error");
          }
          firstInvalidField.focus();
          return;
        }

        if (statusNode) {
          statusNode.textContent = "Looks good. Submitting your form...";
          statusNode.classList.remove("is-error");
        }

        const action = (form.getAttribute("action") ?? "").trim();
        if (action === "" || action === "#") {
          event.preventDefault();
          form.reset();
          if (statusNode) {
            statusNode.textContent = "Thanks, your message has been captured.";
            statusNode.classList.remove("is-error");
          }
        }
      });
    });
  };

  document.addEventListener("DOMContentLoaded", init);
})();
