(() => {
    const STORAGE_KEY = "portfolio-analytics-consent";
    const MEASUREMENT_ID = "G-RYXCZGT7N1";
    const SCRIPT_ID = "portfolio-google-analytics";

    let temporaryChoice = null;
    let analyticsLoaded = false;

    function getChoice() {
        try {
            return localStorage.getItem(STORAGE_KEY);
        } catch {
            return temporaryChoice;
        }
    }

    function storeChoice(choice) {
        temporaryChoice = choice;

        try {
            localStorage.setItem(STORAGE_KEY, choice);
        } catch {
            // Mantém a escolha apenas durante esta página.
        }
    }

    function removeChoice() {
        temporaryChoice = null;

        try {
            localStorage.removeItem(STORAGE_KEY);
        } catch {
            // A escolha será solicitada novamente.
        }
    }

    function deleteAnalyticsCookies() {
        const hostname = window.location.hostname;
        const domains = [""];

        // Tenta o domínio atual e os domínios-pai aplicáveis.
        const parts = hostname.split(".");

        for (let i = 0; i < parts.length - 1; i++) {
            domains.push("." + parts.slice(i).join("."));
        }

        const names = document.cookie
            .split(";")
            .map(cookie => cookie.split("=")[0].trim())
            .filter(name => name === "_ga" || name.startsWith("_ga_"));

        for (const name of names) {
            for (const domain of domains) {
                document.cookie =
                    `${name}=; Max-Age=0; path=/` +
                    (domain ? `; domain=${domain}` : "") +
                    "; SameSite=Lax";
            }
        }
    }

    function revokeConsent() {
        // Atualiza a escolha local antes de qualquer recarregamento.
        storeChoice("rejected");

        // Impede armazenamento de Analytics daqui em diante.
        if (typeof window.gtag === "function") {
            window.gtag("consent", "update", {
                analytics_storage: "denied"
            });
        }

        deleteAnalyticsCookies();
    }

    function loadAnalytics() {
        if (getChoice() !== "accepted") {
            return;
        }

        // Evita inicializar a biblioteca mais de uma vez.
        if (document.getElementById(SCRIPT_ID)) {
            if (typeof window.gtag === "function") {
                window.gtag("consent", "update", {
                    analytics_storage: "granted"
                });
            }

            return;
        }

        window.dataLayer = window.dataLayer || [];

        window.gtag = function () {
            window.dataLayer.push(arguments);
        };

        // Define o consentimento padrão antes da configuração.
        window.gtag("consent", "default", {
            analytics_storage: "denied"
        });

        // Como houve aceitação, atualiza o consentimento antes
        // de configurar a medição e carregar a biblioteca.
        window.gtag("consent", "update", {
            analytics_storage: "granted"
        });

        window.gtag("js", new Date());
        window.gtag("config", MEASUREMENT_ID);

        const script = document.createElement("script");
        script.id = SCRIPT_ID;
        script.async = true;
        script.src =
            "https://www.googletagmanager.com/gtag/js?id=" +
            MEASUREMENT_ID;

        document.head.appendChild(script);
        analyticsLoaded = true;
    }

    function addStyles() {
        if (document.getElementById("analytics-consent-style")) {
            return;
        }

        const style = document.createElement("style");
        style.id = "analytics-consent-style";

        style.textContent = `
            #analytics-consent {
                position: fixed;
                z-index: 99999;
                left: 20px;
                right: 20px;
                bottom: 20px;
                max-width: 620px;
                margin: 0 auto;
                padding: 20px;
                color: #fff;
                background: #171717;
                border: 1px solid #777;
                border-radius: 12px;
                box-shadow: 0 0 18px #0009;
                font: 15px/1.5 Arial, sans-serif;
            }

            #analytics-consent h2 {
                margin: 0 0 8px;
                font-size: 20px;
            }

            #analytics-consent p {
                margin: 0 0 15px;
            }

            #analytics-consent .consent-actions {
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
            }

            #analytics-consent button,
            #privacy-settings {
                padding: 10px 14px;
                border: 1px solid #aaa;
                border-radius: 8px;
                cursor: pointer;
                font: inherit;
            }

            #analytics-consent button:focus-visible,
            #privacy-settings:focus-visible {
                outline: 2px solid #fff;
                outline-offset: 3px;
            }

            #analytics-consent .accept {
                color: #111;
                background: #fff;
            }

            #analytics-consent .reject {
                color: #fff;
                background: #292929;
            }

            #privacy-settings {
                position: fixed;
                z-index: 99998;
                right: 12px;
                bottom: 12px;
                color: #fff;
                background: #222;
                font-size: 13px;
            }

            @media (max-width: 480px) {
                #analytics-consent {
                    left: 10px;
                    right: 10px;
                    bottom: 10px;
                    padding: 15px;
                }

                #analytics-consent .consent-actions {
                    flex-direction: column;
                }
            }
        `;

        document.head.appendChild(style);
    }

    function renderInterface() {
        document.getElementById("analytics-consent")?.remove();
        document.getElementById("privacy-settings")?.remove();

        addStyles();

        const choice = getChoice();

        if (choice === "accepted") {
            loadAnalytics();
            showSettingsButton();
            return;
        }

        if (choice === "rejected") {
            showSettingsButton();
            return;
        }

        const banner = document.createElement("section");
        banner.id = "analytics-consent";
        banner.setAttribute("role", "dialog");
        banner.setAttribute("aria-labelledby", "consent-title");
        banner.setAttribute("aria-describedby", "consent-description");

        banner.innerHTML = `
            <h2 id="consent-title">Sua privacidade importa</h2>

            <p id="consent-description">
                Este portfólio utiliza o Google Analytics para entender
                as visitas e melhorar o site. Você pode aceitar ou
                recusar essa análise e continuar navegando normalmente.
            </p>

            <div class="consent-actions">
                <button type="button" class="accept">
                    Aceitar análise
                </button>

                <button type="button" class="reject">
                    Recusar análise
                </button>
            </div>
        `;

        banner.querySelector(".accept").addEventListener("click", () => {
            saveChoice("accepted");
        });

        banner.querySelector(".reject").addEventListener("click", () => {
            saveChoice("rejected");
        });

        document.body.appendChild(banner);
    }

    function saveChoice(choice) {
        if (choice === "accepted") {
            storeChoice("accepted");
            loadAnalytics();
            renderInterface();
            return;
        }

        if (choice === "rejected") {
            revokeConsent();
            deleteAnalyticsCookies();

            // Se a biblioteca já foi inserida, recarrega a página
            // para que ela não seja inicializada nesta nova visita.
            if (document.getElementById(SCRIPT_ID)) {
                window.location.reload();
                return;
            }

            renderInterface();
        }
    }

    function showSettingsButton() {
        if (document.getElementById("privacy-settings")) {
            return;
        }

        const button = document.createElement("button");
        button.id = "privacy-settings";
        button.type = "button";
        button.textContent = "Privacidade / cookies";

        button.addEventListener("click", () => {
            const previousChoice = getChoice();

            if (previousChoice === "accepted") {
                revokeConsent();
                deleteAnalyticsCookies();
                removeChoice();

                // O recarregamento evita carregar novamente a
                // biblioteca, pois não haverá aceitação salva.
                window.location.reload();
                return;
            }

            removeChoice();
            renderInterface();
        });

        document.body.appendChild(button);
    }

    // Inicializa a interface e só carrega o Analytics
    // quando existe uma aceitação salva.
    renderInterface();
})();
