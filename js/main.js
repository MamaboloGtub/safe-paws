(() => {
  const allowedSharedComponents = new Set(["header", "footer"]);
  const componentHtmlCache = new Map();
  const submissionLogStorageKey = "safePawsRecentEnquiries";
  const maxSubmissionLogEntries = 8;

  const resolveCurrentPageName = () => {
    const pathname = globalThis.location?.pathname ?? "";
    const lastSegment = pathname.split("/").pop() ?? "";
    return lastSegment || "index.html";
  };

  const setActiveNavigationLink = (scope) => {
    const currentPageName = resolveCurrentPageName();
    const links = scope.querySelectorAll("nav a[href]");

    links.forEach((link) => {
      const href = link.getAttribute("href") ?? "";
      const hrefPageName = href.split("/").pop() ?? "";

      if (hrefPageName === currentPageName) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };

  const loadSharedComponents = async () => {
    const mounts = Array.from(document.querySelectorAll("[data-component]"));

    if (!mounts.length) {
      return;
    }

    await Promise.all(
      mounts.map(async (mount) => {
        const componentName = mount.dataset.component;
        if (!componentName || !allowedSharedComponents.has(componentName)) {
          return;
        }

        try {
          let componentMarkup = componentHtmlCache.get(componentName);

          if (!componentMarkup) {
            const response = await fetch(`./components/${componentName}.html`, {
              cache: "force-cache",
              credentials: "same-origin"
            });

            const contentType = response.headers.get("content-type") ?? "";
            if (!response.ok || !contentType.includes("text/html")) {
              return;
            }

            componentMarkup = await response.text();
            componentHtmlCache.set(componentName, componentMarkup);
          }

          mount.outerHTML = componentMarkup;

          if (componentName === "header") {
            const headerNode = document.querySelector("header.navbar");
            if (headerNode) {
              setActiveNavigationLink(headerNode);
            }
          }
        } catch (error) {
          // Keep page functional even if component loading fails.
          console.warn(`Unable to load ${componentName} component.`, error);
        }
      })
    );
  };

  const loadStylesheetOnce = (href, id) =>
    new Promise((resolve, reject) => {
      const existing = document.getElementById(id);
      if (existing) {
        resolve();
        return;
      }

      const stylesheet = document.createElement("link");
      stylesheet.id = id;
      stylesheet.rel = "stylesheet";
      stylesheet.href = href;
      stylesheet.onload = () => resolve();
      stylesheet.onerror = () => reject(new Error(`Unable to load stylesheet: ${href}`));
      document.head.appendChild(stylesheet);
    });

  const loadScriptOnce = (src, id) =>
    new Promise((resolve, reject) => {
      const existing = document.getElementById(id);
      if (existing) {
        if (globalThis.L) {
          resolve();
          return;
        }

        existing.addEventListener("load", () => resolve(), { once: true });
        existing.addEventListener(
          "error",
          () => reject(new Error(`Unable to load script: ${src}`)),
          { once: true }
        );
        return;
      }

      const script = document.createElement("script");
      script.id = id;
      script.src = src;
      script.async = true;
      script.defer = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Unable to load script: ${src}`));
      document.head.appendChild(script);
    });

  const initContactMap = () => {
    const mapSection = document.getElementById("contact-map-section");
    const mapNode = document.getElementById("contact-map");

    if (!mapSection || !mapNode) {
      return;
    }

    let hasInitialized = false;

    const startMap = async () => {
      if (hasInitialized) {
        return;
      }

      hasInitialized = true;

      try {
        await loadStylesheetOnce(
          "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",
          "leaflet-stylesheet"
        );
        await loadScriptOnce(
          "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js",
          "leaflet-script"
        );

        if (!globalThis.L) {
          return;
        }

        const lat = Number(mapNode.dataset.lat ?? "-23.9045");
        const lng = Number(mapNode.dataset.lng ?? "29.4689");
        const zoom = Number(mapNode.dataset.zoom ?? "13");

        const leafletMap = globalThis.L.map(mapNode).setView([lat, lng], zoom);

        globalThis.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(leafletMap);

        globalThis.L
          .marker([lat, lng])
          .addTo(leafletMap)
          .bindPopup("Safe Paws Rescue Center, Polokwane")
          .openPopup();

        requestAnimationFrame(() => leafletMap.invalidateSize());
      } catch (error) {
        console.warn("Unable to initialize contact map.", error);
      }
    };

    if (!("IntersectionObserver" in globalThis)) {
      startMap();
      return;
    }

    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (!visibleEntry) {
          return;
        }

        currentObserver.unobserve(mapSection);
        startMap();
      },
      { rootMargin: "200px 0px", threshold: 0.1 }
    );

    observer.observe(mapSection);
  };

  const init = async () => {
    await loadSharedComponents();
    initContactMap();
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
    image.loading = "lazy";
    image.decoding = "async";
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
        image.loading = "lazy";
        image.decoding = "async";

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
      '<img class="modal-image" src="" alt="" loading="lazy" decoding="async" />' +
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

  const fieldErrorId = (field) => {
    const stableKey = field.id || field.name || "field";
    return `${stableKey}-error`;
  };

  const getFieldErrorNode = (field) => {
    const id = fieldErrorId(field);
    let errorNode = document.getElementById(id);

    if (!errorNode) {
      errorNode = document.createElement("small");
      errorNode.id = id;
      errorNode.className = "field-error";
      errorNode.setAttribute("aria-live", "polite");
      field.after(errorNode);
    }

    return errorNode;
  };

  const setFieldError = (field, message) => {
    const errorNode = getFieldErrorNode(field);
    errorNode.textContent = message;
    field.classList.add("input-error");
    field.setAttribute("aria-invalid", "true");

    const describedBy = field.getAttribute("aria-describedby") ?? "";
    const tokens = describedBy.split(" ").filter(Boolean);
    const errorId = fieldErrorId(field);
    if (!tokens.includes(errorId)) {
      tokens.push(errorId);
      field.setAttribute("aria-describedby", tokens.join(" "));
    }
  };

  const clearFieldError = (field) => {
    const errorNode = document.getElementById(fieldErrorId(field));
    if (errorNode) {
      errorNode.textContent = "";
    }

    field.classList.remove("input-error");
    field.removeAttribute("aria-invalid");
  };

  const defaultFieldErrorMessage = (field) => {
    const label =
      field.getAttribute("aria-label") ||
      field.closest("p")?.querySelector(`label[for="${field.id}"]`)?.textContent?.replace("*", "").trim() ||
      "This field";

    if (field.validity.valueMissing) {
      return `${label} is required.`;
    }

    if (field.validity.typeMismatch && field.type === "email") {
      return "Please enter a valid email address.";
    }

    if (field.validity.patternMismatch && field.name === "phone") {
      return "Please enter a valid phone number (7 to 15 digits, optional +, spaces, or -).";
    }

    if (field.validity.tooShort) {
      return `${label} is too short.`;
    }

    if (field.validity.rangeUnderflow) {
      return `${label} is below the allowed minimum.`;
    }

    return `Please enter a valid value for ${label.toLowerCase()}.`;
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

  const isConditionalFieldValid = (form) => {
    const enquiryType = form.querySelector("#enquiry-type");
    const animalName = form.querySelector("#animal-name");

    if (!enquiryType || !animalName) {
      return true;
    }

    if (enquiryType.value !== "animal") {
      clearFieldError(animalName);
      return true;
    }

    if (animalName.value.trim().length > 1) {
      clearFieldError(animalName);
      return true;
    }

    setFieldError(animalName, "Please enter the animal name for this enquiry type.");
    return false;
  };

  const clearAllFieldErrors = (form) => {
    form.querySelectorAll("input, select, textarea").forEach((field) => clearFieldError(field));
  };

  const refreshCounters = (form) => {
    form.querySelectorAll("textarea").forEach((textarea) => {
      textarea.dispatchEvent(new Event("input", { bubbles: true }));
    });
  };

  const validateFormFields = (form) => {
    const fields = form.querySelectorAll("input, select, textarea");
    let firstInvalidField = null;

    fields.forEach((field) => {
      clearFieldError(field);

      const invalid = field.type === "radio" && field.required
        ? !isRadioGroupValid(form, field)
        : !field.checkValidity();

      if (invalid) {
        const message = defaultFieldErrorMessage(field);
        setFieldError(field, message);
        firstInvalidField ??= field;
      }
    });

    if (!isConditionalFieldValid(form)) {
      const conditionalField = form.querySelector("#animal-name");
      firstInvalidField ??= conditionalField;
    }

    return firstInvalidField;
  };

  const shouldSubmitLocally = (form) => {
    const mode = (form.dataset.submitMode ?? "").trim();

    if (mode === "local") {
      return true;
    }

    const action = (form.getAttribute("action") ?? "").trim();
    return action === "" || action === "#";
  };

  const isSubmissionLoggingEnabled = (form) =>
    (form.dataset.logSubmissions ?? "").trim() === "true";

  const loadSubmissionLog = () => {
    try {
      const raw = globalThis.localStorage?.getItem(submissionLogStorageKey);
      if (!raw) {
        return [];
      }

      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };

  const saveSubmissionLog = (entries) => {
    try {
      globalThis.localStorage?.setItem(
        submissionLogStorageKey,
        JSON.stringify(entries.slice(0, maxSubmissionLogEntries))
      );
    } catch {
      // Ignore storage errors (private mode, quota limits, etc.)
    }
  };

  const trimValue = (value, maxLength = 120) => {
    const normalized = String(value ?? "").trim();
    return normalized.length > maxLength
      ? `${normalized.slice(0, maxLength - 1)}...`
      : normalized;
  };

  const buildSubmissionRecord = (form) => {
    const name = trimValue(form.querySelector('[name="fullname"]')?.value, 60);
    const email = trimValue(form.querySelector('[name="email"]')?.value, 100);
    const subject = trimValue(
      form.querySelector('[name="subject"], [name="enquiryType"]')?.value,
      60
    );
    const message = trimValue(form.querySelector('[name="message"]')?.value, 80);

    return {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      formId: form.id || "form",
      submittedAt: new Date().toISOString(),
      name,
      email,
      subject,
      message
    };
  };

  const appendSubmissionRecord = (record) => {
    const existing = loadSubmissionLog();
    const next = [record, ...existing].slice(0, maxSubmissionLogEntries);
    saveSubmissionLog(next);
    return next;
  };

  const formatSubmissionDate = (isoDate) => {
    const date = new Date(isoDate);
    if (Number.isNaN(date.getTime())) {
      return "Unknown time";
    }

    return new Intl.DateTimeFormat(undefined, {
      dateStyle: "medium",
      timeStyle: "short"
    }).format(date);
  };

  const ensureSubmissionLogContainer = (form) => {
    const existing = form.parentElement?.querySelector(".submission-log");
    if (existing) {
      return existing;
    }

    const section = document.createElement("section");
    section.className = "submission-log";
    section.setAttribute("aria-live", "polite");
    section.innerHTML =
      '<h3 class="submission-log-title">Recent Enquiries (Demo)</h3>' +
      '<p class="submission-log-intro">Stored locally in this browser for demo purposes.</p>' +
      '<ul class="submission-log-list"></ul>' +
      '<p class="submission-log-empty" hidden>No recent enquiries yet.</p>' +
      '<p><button type="button" class="submission-log-clear">Clear log</button></p>';

    form.after(section);
    return section;
  };

  const renderSubmissionLog = (form, entries) => {
    const container = ensureSubmissionLogContainer(form);
    const list = container.querySelector(".submission-log-list");
    const emptyState = container.querySelector(".submission-log-empty");
    const clearButton = container.querySelector(".submission-log-clear");

    const filteredEntries = entries.filter((entry) =>
      (entry.formId ?? "") === (form.id || "form")
    );

    if (!filteredEntries.length) {
      list?.replaceChildren();
      if (emptyState) {
        emptyState.hidden = false;
      }
      if (clearButton) {
        clearButton.disabled = true;
      }
      return;
    }

    const items = filteredEntries.map((entry) => {
      const item = document.createElement("li");
      item.className = "submission-log-item";

      const labelParts = [
        entry.name ? `Name: ${entry.name}` : "",
        entry.email ? `Email: ${entry.email}` : "",
        entry.subject ? `Type: ${entry.subject}` : "",
        entry.message ? `Message: ${entry.message}` : ""
      ].filter(Boolean);

      item.innerHTML =
        `<strong>${formatSubmissionDate(entry.submittedAt)}</strong>` +
        `<br>${labelParts.join(" | ")}`;

      return item;
    });

    list?.replaceChildren(...items);
    if (emptyState) {
      emptyState.hidden = true;
    }
    if (clearButton) {
      clearButton.disabled = false;
    }

    if (clearButton?.dataset.bound !== "true") {
      clearButton.dataset.bound = "true";
      clearButton.addEventListener("click", () => {
        const current = loadSubmissionLog().filter(
          (entry) => (entry.formId ?? "") !== (form.id || "form")
        );
        saveSubmissionLog(current);
        renderSubmissionLog(form, current);
      });
    }
  };

  const clearErrorStatus = (statusNode) => {
    if (!statusNode?.classList.contains("is-error")) {
      return;
    }

    statusNode.textContent = "";
    statusNode.classList.remove("is-error");
  };

  const bindFieldValidationHandlers = (form, statusNode) => {
    const fields = form.querySelectorAll("input, select, textarea");

    fields.forEach((field) => {
      const clearOnEdit = () => {
        clearFieldError(field);
        clearErrorStatus(statusNode);
      };

      field.addEventListener("input", clearOnEdit);
      field.addEventListener("change", clearOnEdit);
    });
  };

  // =========================================================================
  // SNACKBAR NOTIFICATION SYSTEM
  // =========================================================================
  let activeSnackbarTimer = null;

  const showSnackbar = (message, type = "success", duration = 4000) => {
    // type: "success" (green), "redirect" (orange), "error" (red)
    const existing = document.querySelector(".snackbar");
    if (existing) {
      existing.remove();
    }

    if (activeSnackbarTimer) {
      clearTimeout(activeSnackbarTimer);
      activeSnackbarTimer = null;
    }

    const snackbar = document.createElement("div");
    snackbar.className = `snackbar snackbar--${type}`;
    snackbar.setAttribute("role", "alert");
    snackbar.setAttribute("aria-live", "assertive");
    snackbar.textContent = message;
    document.body.appendChild(snackbar);

    // Trigger reflow then show
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        snackbar.classList.add("is-visible");
      });
    });

    activeSnackbarTimer = setTimeout(() => {
      snackbar.classList.remove("is-visible");
      setTimeout(() => snackbar.remove(), 400);
      activeSnackbarTimer = null;
    }, duration);
  };

  // =========================================================================
  // ENQUIRY RESPONSE DATA — contextual feedback based on enquiry type
  // =========================================================================
  const enquiryResponseData = {
    general: {
      title: "General Enquiry Received",
      message: "Thank you for reaching out! Our team will respond within 24-48 business hours. In the meantime, you may find answers on our FAQ page.",
      details: "No fees apply for general enquiries."
    },
    animal: {
      title: "Animal Enquiry Received",
      message: "We have noted your interest in a specific animal. A team member will contact you with availability and scheduling details.",
      details: "Adoption fees: Dogs R800-R1,200 | Cats R400-R700 | Rabbits R200-R400. All pets include vaccinations and medical records."
    },
    adoption: {
      title: "Adoption Process Enquiry",
      message: "Great news — our adoption process typically takes 5-7 business days from application to finalisation.",
      details: "Steps: Application → Review → Meet & Greet → Paperwork → Take your pet home. Adoption fees include spaying/neutering, microchipping, and vaccinations."
    },
    volunteer: {
      title: "Volunteer Interest Received",
      message: "We appreciate your willingness to help! Volunteer slots are available Monday-Saturday.",
      details: "Available roles: Animal care, dog walking, admin support, event coordination. No cost to volunteer — training is provided on-site."
    },
    foster: {
      title: "Foster Care Enquiry",
      message: "Fostering helps our animals adjust to home life while awaiting adoption. We provide food and medical supplies at no cost to you.",
      details: "Foster periods: Typically 2-6 weeks. We cover all veterinary expenses and provide food, bedding, and guidance."
    },
    donation: {
      title: "Donation Enquiry Received",
      message: "Thank you for considering a donation! Every contribution supports rescue, rehabilitation, and rehoming.",
      details: "We accept financial donations, pet food, blankets, toys, and medical supplies. All donations are tax-deductible."
    },
    feedback: {
      title: "Feedback Received",
      message: "We value your feedback and will review it carefully. If follow-up is needed, we will contact you within 48 hours.",
      details: "All feedback is shared with our management team for continuous improvement."
    },
    other: {
      title: "Enquiry Received",
      message: "Thank you for your message. Our team will review your enquiry and respond as soon as possible.",
      details: "Typical response time is 24-48 business hours."
    }
  };

  const buildEnquiryResponseHTML = (enquiryType, name) => {
    const data = enquiryResponseData[enquiryType] || enquiryResponseData.other;
    const greeting = name ? `Hi ${name}, ` : "";

    return (
      `<section class="enquiry-response" aria-live="polite">` +
      `<h3>${data.title}</h3>` +
      `<p>${greeting}${data.message}</p>` +
      `<p><strong>Details:</strong> ${data.details}</p>` +
      `<p><a href="faq.html">Browse FAQs</a> | <a href="adoption.html">View Available Pets</a></p>` +
      `</section>`
    );
  };

  const showEnquiryResponse = (form) => {
    const enquiryType = form.querySelector('[name="enquiryType"]')?.value ?? "other";
    const name = form.querySelector('[name="fullname"]')?.value?.trim() ?? "";

    // Remove any previous response
    const existing = form.parentElement?.querySelector(".enquiry-response");
    if (existing) {
      existing.remove();
    }

    const responseHTML = buildEnquiryResponseHTML(enquiryType, name);
    form.insertAdjacentHTML("afterend", responseHTML);
  };

  // =========================================================================
  // FORM LOADING OVERLAY — shows spinner during async operations
  // =========================================================================
  const showFormLoader = (form, text = "Sending your message...") => {
    // Ensure parent is positioned for overlay
    form.style.position = "relative";

    const overlay = document.createElement("div");
    overlay.className = "form-loader-overlay";
    overlay.innerHTML =
      '<div class="form-spinner" aria-hidden="true"></div>' +
      `<p class="form-loader-text">${text}</p>`;
    overlay.setAttribute("role", "status");
    overlay.setAttribute("aria-live", "polite");
    form.appendChild(overlay);

    // Disable submit button
    const submitBtn = form.querySelector('[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
    }

    return overlay;
  };

  const hideFormLoader = (form) => {
    const overlay = form.querySelector(".form-loader-overlay");
    if (overlay) {
      overlay.remove();
    }

    const submitBtn = form.querySelector('[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = false;
    }

    form.style.position = "";
  };

  // =========================================================================
  // CONTACT FORM — send email via EmailJS
  // =========================================================================
  const sendContactEmail = async (form) => {
    const serviceID = "service_wly68fi";
    const templateID = "template_8gdpya7";

    const templateParams = {
      fullname: form.querySelector('[name="fullname"]')?.value?.trim() ?? "",
      email: form.querySelector('[name="email"]')?.value?.trim() ?? "",
      phone: form.querySelector('[name="phone"]')?.value?.trim() ?? "",
      subject: form.querySelector('[name="subject"]')?.value ?? "General",
      message: form.querySelector('[name="message"]')?.value?.trim() ?? "",
      time: new Date().toLocaleString()
    };

    try {
      // Fallback safely to window.emailjs if globalThis doesn't recognize it
    const emailJSInstance = globalThis.emailjs || window.emailjs;
    
      if (!emailJSInstance) {
        throw new Error("EmailJS SDK is completely missing from the window object. Check your script tag.");
      }

      // Use the resolved instance to send
      const response = await emailJSInstance.send(serviceID, templateID, templateParams);
      console.log("EmailJS Success Response:", response);
      return { success: true, response };
    } catch (error) {
      // Changed to console.error so it shows up bright red in your DevTools
      console.error("EmailJS send failed heavily:", error);
      return { success: false, error };
    }
};

  // =========================================================================
  // AJAX FORM SUBMISSION — uses fetch() to submit asynchronously
  // =========================================================================
  const submitFormViaAjax = async (form) => {
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      // Attempt async submission to a mock endpoint (works with services like Formspree/EmailJS)
      const response = await fetch("https://httpbin.org/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }

      return { success: true };
    } catch (error) {
      // Graceful fallback — log locally if network request fails
      console.warn("AJAX submission failed, using local fallback.", error);
      return { success: false, error };
    }
  };

  const initFormEnhancements = () => {
    const forms = document.querySelectorAll("form.form");

    if (!forms.length) {
      return;
    }

    forms.forEach((form) => {
      enhanceTextareaCounter(form);
      addStatusRegion(form);

      const statusNode = form.querySelector(".form-status");
      bindFieldValidationHandlers(form, statusNode);

      if (isSubmissionLoggingEnabled(form)) {
        renderSubmissionLog(form, loadSubmissionLog());
      }

      form.addEventListener("submit", async (event) => {
        clearAllFieldErrors(form);
        const firstInvalidField = validateFormFields(form);

        if (firstInvalidField) {
          event.preventDefault();
          if (statusNode) {
            statusNode.textContent = "Please complete all required fields correctly.";
            statusNode.classList.add("is-error");
          }
          showSnackbar("Please fix the errors in the form.", "error");
          firstInvalidField.focus();
          return;
        }

        if (statusNode) {
          statusNode.textContent = "Submitting your form...";
          statusNode.classList.remove("is-error");
        }

        if (shouldSubmitLocally(form)) {
          event.preventDefault();

          // Determine which form we are handling
          const isEnquiryForm = form.id === "enquiry-form";
          const isContactForm = form.id === "contact-form";

          // AJAX submission (asynchronous fetch)
          const ajaxResult = await submitFormViaAjax(form);

          // Log submission locally regardless of AJAX outcome
          if (isSubmissionLoggingEnabled(form)) {
            const record = buildSubmissionRecord(form);
            const updatedLog = appendSubmissionRecord(record);
            renderSubmissionLog(form, updatedLog);
          }

          // Form-specific post-submission behaviour
          if (isEnquiryForm) {
            // Show contextual response based on enquiry type (cost, availability, etc.)
            showEnquiryResponse(form);
            showSnackbar("Enquiry submitted successfully!", "success");
          }

          if (isContactForm) {
            // Show loading spinner while email sends
            const loader = showFormLoader(form, "Sending your message...");

            // Send email via EmailJS
            const emailResult = await sendContactEmail(form);

            // Remove loader
            hideFormLoader(form);

            if (emailResult.success) {
              showSnackbar("Email sent successfully! Our team will contact you shortly.", "success", 5000);
            } else {
              showSnackbar("Message saved locally. Email delivery may be delayed.", "redirect", 5000);
            }
          }

          form.reset();
          clearAllFieldErrors(form);
          refreshCounters(form);

          if (statusNode) {
            if (isContactForm) {
              statusNode.textContent = "Your message has been sent to our team.";
            } else {
              statusNode.textContent = "Thanks! Your enquiry has been submitted successfully.";
            }
            statusNode.classList.remove("is-error");
          }
        }
      });

      form.addEventListener("reset", () => {
        clearAllFieldErrors(form);
        refreshCounters(form);

        // Remove any enquiry response panel
        const existingResponse = form.parentElement?.querySelector(".enquiry-response");
        if (existingResponse) {
          existingResponse.remove();
        }

        if (statusNode) {
          statusNode.textContent = "";
          statusNode.classList.remove("is-error");
        }
      });
    });
  };

  document.addEventListener("DOMContentLoaded", init);
})();
