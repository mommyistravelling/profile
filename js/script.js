document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Initialize AOS Animation Library
    AOS.init({
        once: true,
        offset: 80,
        duration: 800,
        easing: 'ease-out-cubic'
    });

    // 2. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. See More Social Modal Logic
    const socialModal = document.getElementById('socialModal');
    const seeMoreBtn = document.getElementById('seeMoreBtn');
    const closeModal = document.querySelector('.close-modal');

    if(seeMoreBtn && socialModal && closeModal) {
        // Open modal
        seeMoreBtn.addEventListener('click', () => {
            socialModal.classList.add('show');
        });

        // Close modal on X click
        closeModal.addEventListener('click', () => {
            socialModal.classList.remove('show');
        });

        // Close modal when clicking outside the content box
        window.addEventListener('click', (event) => {
            if (event.target === socialModal) {
                socialModal.classList.remove('show');
            }
        });
    }

    // 4. Form Submission & Google Sheets Integration
    const joinForm = document.getElementById('joinForm');
    const submitBtn = document.getElementById('submitBtn');
    
    if(joinForm && submitBtn) {
        const btnText = submitBtn.querySelector('.btn-text');
        const formMessage = document.getElementById('formMessage');

        joinForm.addEventListener('submit', async function(e) {
            e.preventDefault(); 

            // Check email validation before proceeding
            const emailInput = document.getElementById('email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailInput && !emailRegex.test(emailInput.value)) {
                return; // Stop submission if email is invalid
            }

            const formData = new FormData(joinForm);

            // UI Loading State
            submitBtn.disabled = true;
            if(btnText) btnText.innerHTML = "Saving your spot...";
            submitBtn.style.opacity = "0.8";
            
            // Reset message
            if(formMessage) {
                formMessage.style.color = "var(--text-main)";
                formMessage.innerHTML = "";
            }

            try {
                const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyHQMOjNTiHMSxX67FQhere7_vYetuFS2_xPdRZyq4Uhk30lnKC9xkLm63DlUbqy8DH/exec";
                
                const response = await fetch(GOOGLE_SCRIPT_URL, {
                    method: 'POST',
                    body: formData
                });

                const result = await response.json();

                if (result.status === "success") {
                    // Success UI Update
                    submitBtn.style.backgroundColor = "#43B581"; // Discord Green
                    if(btnText) btnText.innerHTML = "Success! Redirecting...";
                    if(formMessage) {
                        formMessage.style.color = "#43B581";
                        formMessage.innerHTML = "Data saved successfully!";
                    }
                    
                    // Redirect to Discord
                    setTimeout(() => {
                        // REPLACE THIS WITH YOUR REAL DISCORD INVITE LINK
                        const DISCORD_INVITE_LINK = "https://discord.gg/YOUR_INVITE_CODE";
                        window.location.href = DISCORD_INVITE_LINK;
                    }, 1200);
                } else {
                    throw new Error("Failed to save to spreadsheet.");
                }

            } catch (error) {
                // Error UI Update
                submitBtn.disabled = false;
                if(btnText) btnText.innerHTML = "Join Community & Get Guide";
                submitBtn.style.opacity = "1";
                submitBtn.style.backgroundColor = "#5865F2"; // Reset to default Discord blue
                
                if(formMessage) {
                    formMessage.style.color = "#ff4a4a";
                    formMessage.innerHTML = "Oops! Could not connect to the database. Please try again.";
                }
                console.error(error);
            }
        });
    }

    // 5. Urgency Popup, Side Widget & Countdown Timer Logic
    const urgencyModal = document.getElementById('urgencyModal');
    const closeUrgency = document.querySelector('.close-urgency');
    const claimOfferBtn = document.getElementById('claimOfferBtn');
    
    const sideWidget = document.getElementById('sideWidget');
    const closeSideWidget = document.querySelector('.close-side-widget');

    if(urgencyModal && closeUrgency && claimOfferBtn) {
        // Slide in the main notification 2.5 seconds after page loads
        setTimeout(() => {
            urgencyModal.classList.add('show');
        }, 2500);
        
        // When user closes main modal via X, hide it and show the side widget
        closeUrgency.addEventListener('click', () => {
            urgencyModal.classList.remove('show');
            if(sideWidget) setTimeout(() => sideWidget.classList.add('show'), 500);
        });

        // When user clicks the CTA, hide it (and show side widget as they scroll to form)
        claimOfferBtn.addEventListener('click', () => {
            urgencyModal.classList.remove('show');
            if(sideWidget) setTimeout(() => sideWidget.classList.add('show'), 500);
        });
    }

    // Allow user to completely close the side widget if they want
    if(closeSideWidget && sideWidget) {
        closeSideWidget.addEventListener('click', () => {
            sideWidget.classList.remove('show');
        });
    }

    // Live 15-Minute Countdown Timer (Syncs to both Modals)
    let totalSeconds = 15 * 60; // 15 minutes
    
    // Main Modal Timer Elements
    const minElement = document.getElementById('cd-minutes');
    const secElement = document.getElementById('cd-seconds');
    
    // Side Widget Timer Elements
    const sideMinElement = document.getElementById('side-minutes');
    const sideSecElement = document.getElementById('side-seconds');

    if (minElement || sideMinElement) {
        const timer = setInterval(() => {
            if (totalSeconds <= 0) {
                clearInterval(timer);
                return;
            }
            totalSeconds--;
            
            let minutes = Math.floor(totalSeconds / 60);
            let seconds = totalSeconds % 60;
            
            let formattedMin = minutes < 10 ? '0' + minutes : minutes;
            let formattedSec = seconds < 10 ? '0' + seconds : seconds;
            
            // Update Main Modal
            if(minElement) minElement.innerText = formattedMin;
            if(secElement) secElement.innerText = formattedSec;

            // Update Side Widget
            if(sideMinElement) sideMinElement.innerText = formattedMin;
            if(sideSecElement) sideSecElement.innerText = formattedSec;
        }, 1000);
    }
    
    // 6. Terms & Conditions Modal Logic (Force Scroll to Agree)
    const tncModal = document.getElementById('tncModal');
    const openTncLink = document.getElementById('openTncLink');
    const closeTnc = document.querySelector('.close-tnc');
    const tncScrollBox = document.getElementById('tncScrollBox');
    const agreeTncBtn = document.getElementById('agreeTncBtn');
    const termsCheck = document.getElementById('termsCheck');

    if (tncModal && openTncLink && closeTnc && tncScrollBox && agreeTncBtn) {
        
        // Open Modal when clicking the link in the label
        openTncLink.addEventListener('click', (e) => {
            e.preventDefault();
            tncModal.classList.add('show');
            // Reset scroll position when opened
            tncScrollBox.scrollTop = 0;
            checkScrollPosition(); 
        });

        // Close Modal via X (does not check the box)
        closeTnc.addEventListener('click', () => {
            tncModal.classList.remove('show');
        });

        // Detect scrolling within the text box
        tncScrollBox.addEventListener('scroll', checkScrollPosition);

        function checkScrollPosition() {
            // Check if user has scrolled to the bottom (with a 2px buffer for rendering differences)
            if (tncScrollBox.scrollHeight - tncScrollBox.scrollTop <= tncScrollBox.clientHeight + 2) {
                agreeTncBtn.classList.remove('btn-disabled');
                agreeTncBtn.removeAttribute('disabled');
                agreeTncBtn.innerText = "I Agree to the Terms";
            } else {
                agreeTncBtn.classList.add('btn-disabled');
                agreeTncBtn.setAttribute('disabled', 'true');
                agreeTncBtn.innerText = "Scroll to Agree";
            }
        }

        // When "I Agree" is clicked, check the box and close modal
        agreeTncBtn.addEventListener('click', () => {
            termsCheck.checked = true;
            tncModal.classList.remove('show');
        });
    }

    // 7. Auto-Fill Phone Country Code Logic
    const countryInput = document.getElementById('country');
    const phoneInput = document.getElementById('phone');

    const countryDialingCodes = {
        "Afghanistan": "+93", "Albania": "+355", "Algeria": "+213", "Andorra": "+376", 
        "Angola": "+244", "Antigua and Barbuda": "+1", "Argentina": "+54", "Armenia": "+374", 
        "Australia": "+61", "Austria": "+43", "Azerbaijan": "+994", "Bahamas": "+1", 
        "Bahrain": "+973", "Bangladesh": "+880", "Barbados": "+1", "Belarus": "+375", 
        "Belgium": "+32", "Belize": "+501", "Benin": "+229", "Bhutan": "+975", 
        "Bolivia": "+591", "Bosnia and Herzegovina": "+387", "Botswana": "+267", "Brazil": "+55", 
        "Brunei": "+673", "Bulgaria": "+359", "Burkina Faso": "+226", "Burundi": "+257", 
        "Côte d'Ivoire": "+225", "Cabo Verde": "+238", "Cambodia": "+855", "Cameroon": "+237", 
        "Canada": "+1", "Central African Republic": "+236", "Chad": "+235", "Chile": "+56", 
        "China": "+86", "Colombia": "+57", "Comoros": "+269", "Costa Rica": "+506", 
        "Croatia": "+385", "Cuba": "+53", "Cyprus": "+357", "Czechia": "+420", 
        "Democratic Republic of the Congo": "+243", "Denmark": "+45", "Djibouti": "+253", 
        "Dominica": "+1", "Dominican Republic": "+1", "Ecuador": "+593", "Egypt": "+20", 
        "El Salvador": "+503", "Equatorial Guinea": "+240", "Eritrea": "+291", "Estonia": "+372", 
        "Eswatini": "+268", "Ethiopia": "+251", "Fiji": "+679", "Finland": "+358", "France": "+33", 
        "Gabon": "+241", "Gambia": "+220", "Georgia": "+995", "Germany": "+49", "Ghana": "+233", 
        "Greece": "+30", "Grenada": "+1", "Guatemala": "+502", "Guinea": "+224", 
        "Guinea-Bissau": "+245", "Guyana": "+592", "Haiti": "+509", "Honduras": "+504", 
        "Hungary": "+36", "Iceland": "+354", "India": "+91", "Indonesia": "+62", "Iran": "+98", 
        "Iraq": "+964", "Ireland": "+353", "Israel": "+972", "Italy": "+39", "Jamaica": "+1", 
        "Japan": "+81", "Jordan": "+962", "Kazakhstan": "+7", "Kenya": "+254", "Kiribati": "+686", 
        "Kuwait": "+965", "Kyrgyzstan": "+996", "Laos": "+856", "Latvia": "+371", "Lebanon": "+961", 
        "Lesotho": "+266", "Liberia": "+231", "Libya": "+218", "Liechtenstein": "+423", 
        "Lithuania": "+370", "Luxembourg": "+352", "Madagascar": "+261", "Malawi": "+265", 
        "Malaysia": "+60", "Maldives": "+960", "Mali": "+223", "Malta": "+356", 
        "Marshall Islands": "+692", "Mauritania": "+222", "Mauritius": "+230", "Mexico": "+52", 
        "Micronesia": "+691", "Moldova": "+373", "Monaco": "+377", "Mongolia": "+976", 
        "Montenegro": "+382", "Morocco": "+212", "Mozambique": "+258", "Myanmar": "+95", 
        "Namibia": "+264", "Nauru": "+674", "Nepal": "+977", "Netherlands": "+31", 
        "New Zealand": "+64", "Nicaragua": "+505", "Niger": "+227", "Nigeria": "+234", 
        "North Korea": "+850", "North Macedonia": "+389", "Norway": "+47", "Oman": "+968", 
        "Pakistan": "+92", "Palau": "+680", "Palestine": "+970", "Panama": "+507", 
        "Papua New Guinea": "+675", "Paraguay": "+595", "Peru": "+51", "Philippines": "+63", 
        "Poland": "+48", "Portugal": "+351", "Qatar": "+974", "Romania": "+40", "Russia": "+7", 
        "Rwanda": "+250", "Saint Kitts and Nevis": "+1", "Saint Lucia": "+1", 
        "Saint Vincent and the Grenadines": "+1", "Samoa": "+685", "San Marino": "+378", 
        "Sao Tome and Principe": "+239", "Saudi Arabia": "+966", "Senegal": "+221", 
        "Serbia": "+381", "Seychelles": "+248", "Sierra Leone": "+232", "Singapore": "+65", 
        "Slovakia": "+421", "Slovenia": "+386", "Solomon Islands": "+677", "Somalia": "+252", 
        "South Africa": "+27", "South Korea": "+82", "South Sudan": "+211", "Spain": "+34", 
        "Sri Lanka": "+94", "Sudan": "+249", "Suriname": "+597", "Sweden": "+46", 
        "Switzerland": "+41", "Syria": "+963", "Taiwan": "+886", "Tajikistan": "+992", 
        "Tanzania": "+255", "Thailand": "+66", "Timor-Leste": "+670", "Togo": "+228", 
        "Tonga": "+676", "Trinidad and Tobago": "+1", "Tunisia": "+216", "Turkey": "+90", 
        "Turkmenistan": "+993", "Tuvalu": "+688", "Uganda": "+256", "Ukraine": "+380", 
        "United Arab Emirates": "+971", "United Kingdom": "+44", "United States of America": "+1", 
        "Uruguay": "+598", "Uzbekistan": "+998", "Vanuatu": "+678", "Venezuela": "+58", 
        "Vietnam": "+84", "Yemen": "+967", "Zambia": "+260", "Zimbabwe": "+263"
    };

    if (countryInput && phoneInput) {
        countryInput.addEventListener('change', (e) => {
            const selectedCountry = e.target.value;
            const code = countryDialingCodes[selectedCountry];
            
            if (code) {
                if (phoneInput.value.length < 6) {
                    phoneInput.value = code + " ";
                }
            }
        });
    }

});