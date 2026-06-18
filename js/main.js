(() => {
  const init = () => {
    initTabs();
    initRevealAnimations();
    initFaqAccordion();
    initDynamicPetDirectory();
    initSeeMorePetsModal();
    initAdoptionQuickView();
    initFormEnhancements();
  };

  const petDirectoryData = [
    {
      name: "Buddy",
      type: "dog",
      typeLabel: "Dog",
      breed: "Labrador Retriever",
      ageYears: 2,
      ageLabel: "2 years",
      gender: "Male",
      description:
        "A friendly, energetic dog who loves playing fetch and long walks. Great with children and other dogs.",
      imageSrc: "./images/dogs/labrador.jpg",
      imageAlt: "Buddy, a friendly golden/yellow Labrador"
    },
    {
      name: "Max",
      type: "dog",
      typeLabel: "Dog",
      breed: "Dachshund",
      ageYears: 1,
      ageLabel: "1 year",
      gender: "Male",
      description:
        "Friendly and playful. Good with children and small families and responds well to training.",
      imageSrc: "./images/dogs/dachshund.jpg",
      imageAlt: "Max, a young dachshund puppy"
    },
    {
      name: "Luna",
      type: "dog",
      typeLabel: "Dog",
      breed: "Mixed",
      ageYears: 3,
      ageLabel: "3 years",
      gender: "Female",
      description:
        "A calm and gentle rescue dog looking for a quiet home. Perfect for seniors or small families.",
      imageSrc: "./images/dogs/jamie-street.jpg",
      imageAlt: "Luna, a rescue dog outside"
    },
    {
      name: "Mittens",
      type: "cat",
      typeLabel: "Cat",
      breed: "Tabby",
      ageYears: 2,
      ageLabel: "2 years",
      gender: "Female",
      description:
        "A playful tabby cat who loves attention and interactive play in an active home.",
      imageSrc: "./images/cats/annabel.jpg",
      imageAlt: "Mittens, a calm cat indoors"
    },
    {
      name: "Whiskers",
      type: "cat",
      typeLabel: "Cat",
      breed: "Black and White",
      ageYears: 1,
      ageLabel: "1 year",
      gender: "Male",
      description:
        "Affectionate and cuddly, Whiskers loves sitting on laps and enjoys a calm, loving environment.",
      imageSrc: "./images/cats/brisch.jpg",
      imageAlt: "Whiskers, an affectionate cat"
    },
    {
      name: "Shadow",
      type: "cat",
      typeLabel: "Cat",
      breed: "Gray Domestic",
      ageYears: 3,
      ageLabel: "3 years",
      gender: "Female",
      description:
        "An intelligent and independent cat. Shadow enjoys quiet spaces and gentle routines.",
      imageSrc: "./images/cats/loan-7AIDE8PrvA0-unsplash.jpg",
      imageAlt: "Shadow, a cat with bright eyes"
    },
    {
      name: "Hoppy",
      type: "rabbit",
      typeLabel: "Rabbit",
      breed: "Rabbit",
      ageYears: 1,
      ageLabel: "1 year",
      gender: "Male",
      description:
        "A friendly rabbit who enjoys fresh vegetables and gentle handling in a safe play area.",
      imageSrc: "./images/hamster_rabbit/rabbit_carrot.jpg",
      imageAlt: "Hoppy, a rabbit eating a carrot"
    },
    {
      name: "Clover",
      type: "rabbit",
      typeLabel: "Rabbit",
      breed: "Rabbit",
      ageYears: 0.67,
      ageLabel: "8 months",
      gender: "Female",
      description:
        "Gentle and curious, Clover loves exploring her surroundings and interactive play with safe toys.",
      imageSrc: "./images/hamster_rabbit/rabbit_grass.jpg",
      imageAlt: "Clover, a rabbit in the grass"
    },
    {
      name: "Snowball",
      type: "rabbit",
      typeLabel: "Rabbit",
      breed: "Rabbit",
      ageYears: 2,
      ageLabel: "2 years",
      gender: "Female",
      description:
        "A calm and mature rabbit, perfect for first-time small pet owners.",
      imageSrc: "./images/hamster_rabbit/stockvaul_rabbit.jpg",
      imageAlt: "Snowball, a white rabbit"
    }
  ];

  const createPetCard = (pet) => {
    const card = document.createElement("article");
    card.className = "card adoption-card";

    const title = document.createElement("h4");
    title.textContent = pet.name;

    const figure = document.createElement("figure");
    const image = document.createElement("img");
    image.src = pet.imageSrc;
    image.alt = pet.imageAlt;
    image.width = 200;
    image.height = 200;
    const figcaption = document.createElement("figcaption");
    figcaption.textContent = `${pet.name} - ${pet.breed}, ${pet.ageLabel}`;
    figure.append(image, figcaption);

    const meta = document.createElement("p");
    meta.innerHTML = `<strong>Type:</strong> ${pet.typeLabel} | <strong>Breed:</strong> ${pet.breed} | <strong>Age:</strong> ${pet.ageLabel} | <strong>Gender:</strong> ${pet.gender}`;

    const description = document.createElement("p");
    description.textContent = pet.description;

    const enquiry = document.createElement("p");
    const enquiryLink = document.createElement("a");
    enquiryLink.href = "enquiry.html";
    enquiryLink.textContent = `Enquire about ${pet.name}`;
    enquiry.appendChild(enquiryLink);

    const quickViewButton = document.createElement("button");
    quickViewButton.type = "button";
    quickViewButton.className = "quick-view-btn";
    quickViewButton.textContent = "Quick View";

    card.append(title, figure, meta, description, enquiry, quickViewButton);
    return card;
  };

  const filterAndSortPets = (pets, searchTerm, petType, sortValue) => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    const filtered = pets.filter((pet) => {
      const typeMatches = petType === "all" || pet.type === petType;

      if (!typeMatches) {
        return false;
      }

      if (!normalizedSearch) {
        return true;
      }

      const searchableText = `${pet.name} ${pet.breed} ${pet.description} ${pet.gender}`.toLowerCase();
      return searchableText.includes(normalizedSearch);
    });

    const sorted = [...filtered].sort((petA, petB) => {
      if (sortValue === "age-asc") {
        return petA.ageYears - petB.ageYears;
      }

      if (sortValue === "age-desc") {
        return petB.ageYears - petA.ageYears;
      }

      if (sortValue === "name-desc") {
        return petB.name.localeCompare(petA.name);
      }

      return petA.name.localeCompare(petB.name);
    });

    return sorted;
  };

  const renderPetDirectory = (pets, resultNode, summaryNode) => {
    resultNode.replaceChildren(...pets.map(createPetCard));

    if (summaryNode) {
      const label = pets.length === 1 ? "pet" : "pets";
      summaryNode.textContent = `${pets.length} ${label} found`;
    }
  };

  const initDynamicPetDirectory = () => {
    const controls = document.getElementById("pet-directory-controls");
    const resultNode = document.getElementById("pet-results");

    if (!controls || !resultNode) {
      return;
    }

    const searchInput = controls.querySelector("#pet-search");
    const petTypeFilter = controls.querySelector("#pet-type-filter");
    const sortSelect = controls.querySelector("#pet-sort");
    const summaryNode = document.getElementById("pet-results-summary");

    const updateDirectory = () => {
      const matchingPets = filterAndSortPets(
        petDirectoryData,
        searchInput?.value ?? "",
        petTypeFilter?.value ?? "all",
        sortSelect?.value ?? "name-asc"
      );

      renderPetDirectory(matchingPets, resultNode, summaryNode);
      initAdoptionQuickView();
    };

    searchInput?.addEventListener("input", updateDirectory);
    petTypeFilter?.addEventListener("change", updateDirectory);
    sortSelect?.addEventListener("change", updateDirectory);

    updateDirectory();
  };

  const buildMorePetGalleryData = () => {
    // Use the added Pexels files as the extra gallery content.
    const groups = [
      { typeLabel: "Dog", folder: "dogs", filePrefix: "dog" },
      { typeLabel: "Cat", folder: "cats", filePrefix: "cat" },
      {
        typeLabel: "Rabbit / Small Pet",
        folder: "hamster_rabbit",
        filePrefix: "hamster_rabbit"
      }
    ];

    return groups.flatMap((group) =>
      Array.from({ length: 10 }, (_, index) => {
        const imageNumber = String(index + 1).padStart(2, "0");
        return {
          typeLabel: group.typeLabel,
          imageSrc: `./images/${group.folder}/pexels_${group.filePrefix}_${imageNumber}.jpg`,
          imageAlt: `${group.typeLabel} available for adoption, gallery image ${index + 1}`
        };
      })
    );
  };

  const buildMorePetsModal = () => {
    const wrapper = document.createElement("div");
    wrapper.className = "pet-modal more-pets-modal";
    wrapper.setAttribute("hidden", "");

    wrapper.innerHTML =
      '<div class="modal-backdrop" role="presentation">' +
      '<section class="modal-card more-pets-modal-card" role="dialog" aria-modal="true" aria-labelledby="more-pets-modal-title">' +
      '<button type="button" class="modal-close more-pets-close" aria-label="Close more pets gallery">x</button>' +
      '<h3 id="more-pets-modal-title" class="modal-title">See More Pets</h3>' +
      '<p class="more-pets-intro">Browse additional animals from our photo gallery.</p>' +
      '<div class="cards adoption-cards more-pets-grid" id="more-pets-grid"></div>' +
      '<div class="more-pets-pagination" aria-label="Gallery pagination">' +
      '<button type="button" class="pagination-arrow" id="more-pets-prev" aria-label="Previous page">&larr;</button>' +
      '<p class="more-pets-page-status" id="more-pets-page-status" aria-live="polite"></p>' +
      '<button type="button" class="pagination-arrow" id="more-pets-next" aria-label="Next page">&rarr;</button>' +
      "</div>" +
      "</section>" +
      "</div>";

    document.body.appendChild(wrapper);
    return wrapper;
  };

  const initSeeMorePetsModal = () => {
    const openButton = document.getElementById("open-more-pets-modal");

    if (!openButton) {
      return;
    }

    const galleryData = buildMorePetGalleryData();
    const modal = document.querySelector(".more-pets-modal") ?? buildMorePetsModal();
    const closeButton = modal.querySelector(".more-pets-close");
    const backdrop = modal.querySelector(".modal-backdrop");
    const grid = modal.querySelector("#more-pets-grid");
    const prevButton = modal.querySelector("#more-pets-prev");
    const nextButton = modal.querySelector("#more-pets-next");
    const pageStatus = modal.querySelector("#more-pets-page-status");

    const pageSize = 6;
    const totalPages = Math.max(1, Math.ceil(galleryData.length / pageSize));
    let currentPage = 1;
    let lastFocusedElement = null;

    const renderGalleryPage = () => {
      const start = (currentPage - 1) * pageSize;
      const pageItems = galleryData.slice(start, start + pageSize);

      const cards = pageItems.map((item) => {
        const card = document.createElement("article");
        card.className = "card more-pets-card";

        const figure = document.createElement("figure");
        const image = document.createElement("img");
        image.src = item.imageSrc;
        image.alt = item.imageAlt;
        image.width = 200;
        image.height = 200;

        const figcaption = document.createElement("figcaption");
        figcaption.textContent = item.typeLabel;

        figure.append(image, figcaption);
        card.appendChild(figure);
        return card;
      });

      grid.replaceChildren(...cards);
      pageStatus.textContent = `Page ${currentPage} of ${totalPages}`;
      prevButton.disabled = currentPage === 1;
      nextButton.disabled = currentPage === totalPages;
    };

    const showModal = () => {
      lastFocusedElement = document.activeElement;
      currentPage = 1;
      renderGalleryPage();
      openModal(modal, closeButton);
    };

    const hideModal = () => closeModal(modal, lastFocusedElement);

    if (openButton.dataset.morePetsBound !== "true") {
      openButton.dataset.morePetsBound = "true";
      openButton.addEventListener("click", showModal);
    }

    if (closeButton.dataset.morePetsBound !== "true") {
      closeButton.dataset.morePetsBound = "true";
      closeButton.addEventListener("click", hideModal);
    }

    if (backdrop.dataset.morePetsBound !== "true") {
      backdrop.dataset.morePetsBound = "true";
      backdrop.addEventListener("click", (event) => {
        if (event.target === backdrop) {
          hideModal();
        }
      });
    }

    if (prevButton.dataset.morePetsBound !== "true") {
      prevButton.dataset.morePetsBound = "true";
      prevButton.addEventListener("click", () => {
        if (currentPage > 1) {
          currentPage -= 1;
          renderGalleryPage();
        }
      });
    }

    if (nextButton.dataset.morePetsBound !== "true") {
      nextButton.dataset.morePetsBound = "true";
      nextButton.addEventListener("click", () => {
        if (currentPage < totalPages) {
          currentPage += 1;
          renderGalleryPage();
        }
      });
    }

    if (!modal.dataset.escapeBound) {
      modal.dataset.escapeBound = "true";
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && !modal.hasAttribute("hidden")) {
          hideModal();
        }
      });
    }
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

    const modal = document.querySelector(".pet-modal") ?? buildModal();
    const modalImage = modal.querySelector(".modal-image");
    const modalTitle = modal.querySelector(".modal-title");
    const modalMeta = modal.querySelector(".modal-meta");
    const modalDescription = modal.querySelector(".modal-description");
    const closeButton = modal.querySelector(".modal-close");
    const backdrop = modal.querySelector(".modal-backdrop");

    let lastFocusedElement = null;

    cards.forEach((card) => {
      let button = card.querySelector(".quick-view-btn");

      if (!button) {
        button = document.createElement("button");
        button.type = "button";
        button.className = "quick-view-btn";
        button.textContent = "Quick View";
        card.appendChild(button);
      }

      if (button.dataset.quickViewBound === "true") {
        return;
      }

      button.dataset.quickViewBound = "true";

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
    });

    if (closeButton.dataset.quickViewBound !== "true") {
      closeButton.dataset.quickViewBound = "true";
      closeButton.addEventListener("click", () => closeModal(modal, lastFocusedElement));
    }

    if (backdrop.dataset.quickViewBound !== "true") {
      backdrop.dataset.quickViewBound = "true";
      backdrop.addEventListener("click", (event) => {
        if (event.target === backdrop) {
          closeModal(modal, lastFocusedElement);
        }
      });
    }

    if (!modal.dataset.escapeBound) {
      modal.dataset.escapeBound = "true";
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && !modal.hasAttribute("hidden")) {
          closeModal(modal, lastFocusedElement);
        }
      });
    }
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
