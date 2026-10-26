(() => {
    const STORAGE_KEY = "portfolio-analytics-consent";
    const MEASUREMENT_ID = "G-RYXCZGT7N1";

    let temporaryChoice = null;

    function getChoice() {
        try {
            return localStorage.getItem(STORAGE_KEY);
        } catch (error) {
            return temporaryChoice;
        }
    }

    function storeChoice(choice) {
        temporaryChoice = choice;

        try {
            localStorage.setItem(STORAGE_KEY, choice);
        } catch (error) {
            // A escolha vale durante esta página.
        }
    }

    function removeChoice() {
        temporaryChoice = null;

        try {
            localStorage.removeItem(STORAGE_KEY);
        } catch (error) {
            // A escolha poderá ser feita durante esta página.
        }
    }

    function deleteAnalyticsCookies() {
        const cookies = document.cookie.split(";");

        for (const cookie of cookies) {
            const name = cookie.split("=")[0].trim();

            if (name === "_ga" || name.startsWith("_ga_")) {
                const hostname = window.location.hostname;
                const parts = hostname.split(".");
                const domains = [""];

                // Tenta remover cookies do domínio atual
                // e de seus domínios-pai aplicáveis.
                for (let i = 0; i < parts.length - 1; i++) {
                    domains.push("." + parts.slice(i).join("."));
                }

                for (const domain of domains) {
                    document.cookie =
                        name +
                        "=; Max-Age=0; path=/" +
                        (domain ? "; domain=" + domain : "") +
                        "; SameSite=Lax";
                }
            }
        }
    }

    function revokeConsent() {
        // Bloqueia o armazenamento de Analytics imediatamente.
        if (typeof window.gtag === "function") {
            window.gtag("consent", "update", {
                analytics_storage: "denied"
            });
        }

        deleteAnalyticsCookies();
    }

    function loadAnalytics() {
        // Se a biblioteca já foi carregada nesta página,
        // apenas atualiza o consentimento.
        if (
            document.querySelector(
                'script[data-analytics="portfolio"]'
            )
        ) {
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

        // Define o consentimento antes de configurar o Analytics.
        window.gtag("consent", "default", {
            analytics_storage: "denied"
        });

        window.gtag("js", new Date());
        window.gtag("config", MEASUREMENT_ID);

        const script = document.createElement("script");

        script.async = true;
        script.src =
            "https://www.googletagmanager.com/gtag/js?id=" +
            MEASUREMENT_ID;

        script.dataset.analytics = "portfolio";

        document.head.appendChild(script);

        // A biblioteca só é carregada após a aceitação.
        window.gtag("consent", "update", {
            analytics_storage: "granted"
        });
    }

    function saveChoice(choice) {
        storeChoice(choice);

        if (choice === "accepted") {
            loadAnalytics();
            renderInterface();
            return;
        }

        if (choice === "rejected") {
            // Se o Analytics já estiver ativo, aplica a recusa
            // e recarrega para abrir uma página sem a biblioteca.
            if (
                document.querySelector(
                    'script[data-analytics="portfolio"]'
                )
            ) {
                revokeConsent();
                window.location.reload();
                return;
            }
        }

        renderInterface();
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
                // Revoga a autorização antes de abrir as opções.
                revokeConsent();
                removeChoice();

                // Remove a biblioteca da sessão atual por meio
                // de um recarregamento da página.
                window.location.reload();
                return;
            }

            // Quem havia recusado pode rever a escolha sem recarregar.
            removeChoice();
            renderInterface();
        });

        document.body.appendChild(button);
    }

    // Só carrega o Analytics se já houver consentimento salvo.
    renderInterface();
})();