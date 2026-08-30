/* =========================================================
   MEDISUPPORT - COMPLETE JAVASCRIPT
   Matches the provided index.html exactly
   ========================================================= */


/* =========================================================
   GLOBAL DATA
   ========================================================= */

let patientData = {
    fullName: "",
    age: "",
    phone: "",
    city: "",
    medicalCondition: "",
    hospitalName: "",
    doctorName: "",
    expenseType: "",
    monthlyExpense: 0,
    treatmentDuration: "",
    durationMonths: 0,

    prescription: "",
    medicalCertificate: "",
    medicalBill: "",

    verified: false,
    rejected: false,

    ngoSupport: 0,
    pharmacyDiscount: 0
};


let selectedSupportAmount = 0;


/* =========================================================
   HELPER FUNCTIONS
   ========================================================= */

function getSavedPatient() {

    const savedPatient = localStorage.getItem("mediSupportPatient");

    if (savedPatient) {
        patientData = JSON.parse(savedPatient);
    }

    return patientData;
}


function savePatient() {

    localStorage.setItem(
        "mediSupportPatient",
        JSON.stringify(patientData)
    );
}


function formatCurrency(amount) {

    return new Intl.NumberFormat(
        "en-IN",
        {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0
        }
    ).format(amount || 0);
}


function getDurationMonths() {

    if (patientData.treatmentDuration === "longterm") {
        return 0;
    }

    return Number(patientData.treatmentDuration) || 0;
}


function getDurationText() {

    if (patientData.treatmentDuration === "longterm") {
        return "Long-Term";
    }

    const months = Number(patientData.treatmentDuration);

    if (!months) {
        return "Not Selected";
    }

    if (months === 12) {
        return "1 Year";
    }

    if (months === 24) {
        return "2 Years";
    }

    if (months === 36) {
        return "3 Years";
    }

    return ${months} Months;
}


function getTotalExpense() {

    const months = getDurationMonths();

    if (months === 0) {
        return patientData.monthlyExpense;
    }

    return patientData.monthlyExpense * months;
}


function getRemainingMonthlyExpense() {

    return Math.max(
        0,
        patientData.monthlyExpense -
        patientData.ngoSupport -
        patientData.pharmacyDiscount
    );
}


/* =========================================================
   CUSTOM NOTIFICATION
   ========================================================= */

function showNotification(message, type = "success") {

    const existingNotification =
        document.querySelector(".custom-notification");

    if (existingNotification) {
        existingNotification.remove();
    }


    const notification =
        document.createElement("div");


    notification.className =
        custom-notification ${type};


    const icon =
        type === "error"
            ? "fa-circle-exclamation"
            : type === "info"
                ? "fa-circle-info"
                : "fa-circle-check";


    notification.innerHTML = `

        <div class="notification-inner">

            <i class="fa-solid ${icon}"></i>

            <span>${message}</span>

        </div>

    `;


    document.body.appendChild(notification);


    /* Inline styling so notification works even
       if notification CSS was not added separately */

    Object.assign(notification.style, {

        position: "fixed",
        top: "25px",
        right: "25px",
        zIndex: "9999",

        padding: "16px 22px",

        borderRadius: "12px",

        color: "#ffffff",

        background:
            type === "error"
                ? "#dc3545"
                : type === "info"
                    ? "#2563eb"
                    : "#16a34a",

        boxShadow:
            "0 10px 30px rgba(0,0,0,0.18)",

        transform: "translateX(150%)",

        transition:
            "transform 0.4s ease"

    });


    setTimeout(() => {

        notification.style.transform =
            "translateX(0)";

    }, 50);


    setTimeout(() => {

        notification.style.transform =
            "translateX(150%)";

        setTimeout(() => {

            notification.remove();

        }, 500);

    }, 3500);
}


/* =========================================================
   SMOOTH SCROLL
   ========================================================= */

function scrollToSection(sectionId) {

    const section =
        document.getElementById(sectionId);

    if (section) {

        section.scrollIntoView({

            behavior: "smooth",

            block: "start"

        });

    }

}


/* =========================================================
   NAVBAR SMOOTH SCROLL
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const navLinks =
            document.querySelectorAll(".nav-links a");


        navLinks.forEach(function (link) {

            link.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();


                    const target =
                        this.getAttribute("href");


                    if (target) {

                        const section =
                            document.querySelector(target);


                        if (section) {

                            section.scrollIntoView({

                                behavior: "smooth",

                                block: "start"

                            });

                        }

                    }

                }
            );

        });

    }
);


/* =========================================================
   HERO BUTTONS
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const needSupportBtn =
            document.getElementById(
                "needSupportBtn"
            );


        const exploreBtn =
            document.getElementById(
                "exploreBtn"
            );


        const registerBtn =
            document.getElementById(
                "registerBtn"
            );


        const finalSupportBtn =
            document.getElementById(
                "finalSupportBtn"
            );


        const loginBtn =
            document.getElementById(
                "loginBtn"
            );


        if (needSupportBtn) {

            needSupportBtn.addEventListener(
                "click",
                function () {

                    scrollToSection(
                        "patient-registration"
                    );

                }
            );

        }


        if (registerBtn) {

            registerBtn.addEventListener(
                "click",
                function () {

                    scrollToSection(
                        "patient-registration"
                    );

                }
            );

        }


        if (finalSupportBtn) {

            finalSupportBtn.addEventListener(
                "click",
                function () {

                    scrollToSection(
                        "patient-registration"
                    );

                }
            );

        }


        if (exploreBtn) {

            exploreBtn.addEventListener(
                "click",
                function () {

                    scrollToSection(
                        "how-it-works"
                    );

                }
            );

        }


        if (loginBtn) {

            loginBtn.addEventListener(
                "click",
                function () {

                    showNotification(
                        "Login functionality can be connected to a backend in the next version.",
                        "info"
                    );

                }
            );

        }

    }
);


/* =========================================================
   USER TYPE BUTTONS
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const patientAction =
            document.querySelector(
                ".patientAction"
            );


        const hospitalAction =
            document.querySelector(
                ".hospitalAction"
            );


        const ngoAction =
            document.querySelector(
                ".ngoAction"
            );


        const pharmacyAction =
            document.querySelector(
                ".pharmacyAction"
            );


        if (patientAction) {

            patientAction.addEventListener(
                "click",
                function () {

                    scrollToSection(
                        "patient-registration"
                    );

                }
            );

        }


        if (hospitalAction) {

            hospitalAction.addEventListener(
                "click",
                function () {

                    scrollToSection(
                        "hospital-dashboard"
                    );

                }
            );

        }


        if (ngoAction) {

            ngoAction.addEventListener(
                "click",
                function () {

                    scrollToSection(
                        "ngo-dashboard"
                    );

                }
            );

        }


        if (pharmacyAction) {

            pharmacyAction.addEventListener(
                "click",
                function () {

                    scrollToSection(
                        "pharmacy-dashboard"
                    );

                }
            );

        }

    }
);


/* =========================================================
   EXPENSE CALCULATOR
   ========================================================= */

function calculateExpensePreview() {

    const monthlyExpenseInput =
        document.getElementById(
            "monthlyExpense"
        );


    const treatmentDurationInput =
        document.getElementById(
            "treatmentDuration"
        );


    const monthlyPreview =
        document.getElementById(
            "monthlyPreview"
        );


    const totalPreview =
        document.getElementById(
            "totalPreview"
        );


    if (
        !monthlyExpenseInput ||
        !treatmentDurationInput
    ) {
        return;
    }


    const monthlyExpense =
        Number(
            monthlyExpenseInput.value
        ) || 0;


    const duration =
        treatmentDurationInput.value;


    if (monthlyPreview) {

        monthlyPreview.textContent =
            formatCurrency(
                monthlyExpense
            );

    }


    if (duration === "longterm") {

        totalPreview.textContent =
            "Long-Term Support";

        return;

    }


    const months =
        Number(duration) || 0;


    const total =
        monthlyExpense * months;


    if (totalPreview) {

        totalPreview.textContent =
            formatCurrency(total);

    }

}


/* =========================================================
   EXPENSE CALCULATOR EVENTS
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const monthlyExpense =
            document.getElementById(
                "monthlyExpense"
            );


        const treatmentDuration =
            document.getElementById(
                "treatmentDuration"
            );


        if (monthlyExpense) {

            monthlyExpense.addEventListener(
                "input",
                calculateExpensePreview
            );

        }


        if (treatmentDuration) {

            treatmentDuration.addEventListener(
                "change",
                calculateExpensePreview
            );

        }

    }
);


/* =========================================================
   FILE UPLOAD DISPLAY
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const fileInputs =
            document.querySelectorAll(
                '.upload-box input[type="file"]'
            );


        fileInputs.forEach(function (input) {

            input.addEventListener(
                "change",
                function () {

                    const uploadBox =
                        this.closest(
                            ".upload-box"
                        );


                    const heading =
                        uploadBox.querySelector("h4");


                    if (
                        this.files &&
                        this.files.length > 0
                    ) {

                        const fileName =
                            this.files[0].name;


                        heading.textContent =
                            fileName;


                        uploadBox.style.transform =
                            "scale(1.02)";


                        setTimeout(function () {

                            uploadBox.style.transform =
                                "scale(1)";

                        }, 300);


                    }

                }
            );

        });

    }
);


/* =========================================================
   PATIENT FORM SUBMISSION
   ========================================================= */

function submitPatientForm(event) {

    event.preventDefault();


    const fullName =
        document.getElementById(
            "fullName"
        );


    const age =
        document.getElementById(
            "age"
        );


    const phone =
        document.getElementById(
            "phone"
        );


    const city =
        document.getElementById(
            "city"
        );


    const medicalCondition =
        document.getElementById(
            "medicalCondition"
        );


    const hospitalName =
        document.getElementById(
            "hospitalName"
        );


    const doctorName =
        document.getElementById(
            "doctorName"
        );


    const expenseType =
        document.getElementById(
            "expenseType"
        );


    const monthlyExpense =
        document.getElementById(
            "monthlyExpense"
        );


    const treatmentDuration =
        document.getElementById(
            "treatmentDuration"
        );


    /* Basic validation */

    if (
        fullName.value.trim() === "" ||
        age.value === "" ||
        phone.value.trim() === "" ||
        city.value.trim() === "" ||
        medicalCondition.value.trim() === "" ||
        monthlyExpense.value === "" ||
        treatmentDuration.value === ""
    ) {

        showNotification(
            "Please complete all required fields.",
            "error"
        );

        return;

    }


    /* Phone validation */

    const phoneNumber =
        phone.value.replace(/\D/g, "");


    if (
        phoneNumber.length < 10
    ) {

        showNotification(
            "Please enter a valid mobile number.",
            "error"
        );

        return;

    }


    /* Age validation */

    if (
        Number(age.value) <= 0 ||
        Number(age.value) > 120
    ) {

        showNotification(
            "Please enter a valid age.",
            "error"
        );

        return;

    }


    /* Save patient data */

    patientData = {

        fullName:
            fullName.value.trim(),

        age:
            age.value,

        phone:
            phone.value.trim(),

        city:
            city.value.trim(),

        medicalCondition:
            medicalCondition.value.trim(),

        hospitalName:
            hospitalName.value.trim(),

        doctorName:
            doctorName.value.trim(),

        expenseType:
            expenseType.value,

        monthlyExpense:
            Number(
                monthlyExpense.value
            ),

        treatmentDuration:
            treatmentDuration.value,

        durationMonths:
            treatmentDuration.value ===
            "longterm"
                ? 0
                : Number(
                    treatmentDuration.value
                ),

        prescription:
            document
                .getElementById("prescription")
                .files.length > 0
                    ? document
                        .getElementById("prescription")
                        .files[0].name
                    : "",

        medicalCertificate:
            document
                .getElementById("medicalCertificate")
                .files.length > 0
                    ? document
                        .getElementById("medicalCertificate")
                        .files[0].name
                    : "",

        medicalBill:
            document
                .getElementById("medicalBill")
                .files.length > 0
                    ? document
                        .getElementById("medicalBill")
                        .files[0].name
                    : "",

        verified: false,

        rejected: false,

        ngoSupport: 0,

        pharmacyDiscount: 0

    };


    selectedSupportAmount = 0;


    savePatient();


    updateAllDashboards();


    showNotification(
        "Medical support request submitted successfully!"
    );


    setTimeout(function () {

        scrollToSection(
            "patient-dashboard"
        );

    }, 700);

}


/* =========================================================
   CONNECT PATIENT FORM
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const patientForm =
            document.getElementById(
                "patientForm"
            );


        if (patientForm) {

            patientForm.addEventListener(
                "submit",
                submitPatientForm
            );

        }

    }
);


/* =========================================================
   UPDATE ALL DASHBOARDS
   ========================================================= */

function updateAllDashboards() {

    updatePatientDashboard();

    updateHospitalDashboard();

    updateNGODashboard();

    updateTracker();

}


/* =========================================================
   PATIENT DASHBOARD
   ========================================================= */

function updatePatientDashboard() {

    const dashboardPatientName =
        document.getElementById(
            "dashboardPatientName"
        );


    const dashboardMonthlyExpense =
        document.getElementById(
            "dashboardMonthlyExpense"
        );


    const dashboardDuration =
        document.getElementById(
            "dashboardDuration"
        );


    const dashboardSupport =
        document.getElementById(
            "dashboardSupport"
        );


    const dashboardRemaining =
        document.getElementById(
            "dashboardRemaining"
        );


    const verificationStatus =
        document.getElementById(
            "verificationStatus"
        );


    if (dashboardPatientName) {

        if (patientData.fullName) {

            dashboardPatientName.textContent =
                Welcome, ${patientData.fullName}. Track your medical expenses and support.;

        } else {

            dashboardPatientName.textContent =
                "Track your medical expenses and support.";

        }

    }


    if (dashboardMonthlyExpense) {

        dashboardMonthlyExpense.textContent =
            formatCurrency(
                patientData.monthlyExpense
            );

    }


    if (dashboardDuration) {

        dashboardDuration.textContent =
            getDurationText();

    }


    if (dashboardSupport) {

        dashboardSupport.textContent =
            formatCurrency(
                patientData.ngoSupport +
                patientData.pharmacyDiscount
            );

    }


    if (dashboardRemaining) {

        dashboardRemaining.textContent =
            formatCurrency(
                getRemainingMonthlyExpense()
            );

    }


    if (verificationStatus) {

        if (patientData.rejected) {

            verificationStatus.className =
                "verification-status pending";


            verificationStatus.innerHTML = `

                <i class="fa-solid fa-circle-xmark"></i>

                Request Rejected

            `;


        } else if (
            patientData.verified
        ) {

            verificationStatus.className =
                "verification-status verified";


            verificationStatus.innerHTML = `

                <i class="fa-solid fa-circle-check"></i>

                Verified

            `;


        } else {

            verificationStatus.className =
                "verification-status pending";


            verificationStatus.innerHTML = `

                <i class="fa-solid fa-clock"></i>

                Under Verification

            `;

        }

    }

}


/* =========================================================
   HOSPITAL DASHBOARD
   ========================================================= */

function updateHospitalDashboard() {

    const hospitalPatientName =
        document.getElementById(
            "hospitalPatientName"
        );


    const hospitalMedicalCondition =
        document.getElementById(
            "hospitalMedicalCondition"
        );


    const hospitalMonthlyExpense =
        document.getElementById(
            "hospitalMonthlyExpense"
        );


    const hospitalDuration =
        document.getElementById(
            "hospitalDuration"
        );


    if (hospitalPatientName) {

        hospitalPatientName.textContent =
            patientData.fullName
                ? patientData.fullName
                : "Patient Medical Request";

    }


    if (hospitalMedicalCondition) {

        hospitalMedicalCondition.textContent =
            patientData.medicalCondition
                ? patientData.medicalCondition
                : "Information will appear here";

    }


    if (hospitalMonthlyExpense) {

        hospitalMonthlyExpense.textContent =
            formatCurrency(
                patientData.monthlyExpense
            );

    }


    if (hospitalDuration) {

        hospitalDuration.textContent =
            getDurationText();

    }


    const hospitalStatus =
        document.querySelector(
            "#hospital-dashboard .verification-card-header .status"
        );


    if (hospitalStatus) {

        if (patientData.verified) {

            hospitalStatus.textContent =
                "Verified";


            hospitalStatus.className =
                "status success-status";


        } else if (
            patientData.rejected
        ) {

            hospitalStatus.textContent =
                "Rejected";


            hospitalStatus.className =
                "status pending-status";


        } else {

            hospitalStatus.textContent =
                "Pending Verification";


            hospitalStatus.className =
                "status pending-status";

        }

    }

}


/* =========================================================
   NGO DASHBOARD
   ========================================================= */

function updateNGODashboard() {

    const ngoPatientName =
        document.getElementById(
            "ngoPatientName"
        );


    const ngoPatientRequirement =
        document.getElementById(
            "ngoPatientRequirement"
        );


    const ngoMonthlyRequirement =
        document.getElementById(
            "ngoMonthlyRequirement"
        );


    const ngoDuration =
        document.getElementById(
            "ngoDuration"
        );


    if (ngoPatientName) {

        ngoPatientName.textContent =
            patientData.fullName
                ? patientData.fullName
                : "Verified Patient";

    }


    if (ngoPatientRequirement) {

        if (
            patientData.medicalCondition
        ) {

            ngoPatientRequirement.textContent =
                ${patientData.medicalCondition} - ${patientData.expenseType || "Recurring medical support"} required;

        } else {

            ngoPatientRequirement.textContent =
                "Monthly medical support required";

        }

    }


    if (ngoMonthlyRequirement) {

        ngoMonthlyRequirement.textContent =
            formatCurrency(
                getRemainingMonthlyExpense()
            );

    }


    if (ngoDuration) {

        ngoDuration.textContent =
            getDurationText();

    }

}


/* =========================================================
   MONTHLY TRACKER
   ========================================================= */

function updateTracker() {

    const trackerBody =
        document.getElementById(
            "trackerBody"
        );


    if (!trackerBody) {
        return;
    }


    trackerBody.innerHTML = "";


    if (
        !patientData.monthlyExpense
    ) {

        trackerBody.innerHTML = `

            <tr>

                <td colspan="5">

                    Submit a medical support request
                    to view your expense tracker.

                </td>

            </tr>

        `;

        return;

    }


    let numberOfMonths =
        getDurationMonths();


    /* For long-term prototype,
       show 12 months */

    if (
        patientData.treatmentDuration ===
        "longterm"
    ) {

        numberOfMonths = 12;

    }


    /* If no duration */

    if (numberOfMonths === 0) {

        numberOfMonths = 1;

    }


    for (
        let month = 1;
        month <= numberOfMonths;
        month++
    ) {

        const monthlySupport =
            patientData.ngoSupport +
            patientData.pharmacyDiscount;


        const remaining =
            Math.max(
                0,
                patientData.monthlyExpense -
                monthlySupport
            );


        const status =
            remaining === 0
                ? "Covered"
                : monthlySupport > 0
                    ? "Partially Covered"
                    : "Pending";


        const statusClass =
            remaining === 0
                ? "success-status"
                : "pending-status";


        const row =
            document.createElement(
                "tr"
            );


        row.innerHTML = `

            <td>Month ${month}</td>

            <td>
                ${formatCurrency(
                    patientData.monthlyExpense
                )}
            </td>

            <td>
                ${formatCurrency(
                    monthlySupport
                )}
            </td>

            <td>
                ${formatCurrency(
                    remaining
                )}
            </td>

            <td>

                <span class="
                    status
                    ${statusClass}
                ">

                    ${status}

                </span>

            </td>

        `;


        trackerBody.appendChild(
            row
        );

    }

}


/* =========================================================
   HOSPITAL VERIFICATION
   ========================================================= */

function approvePatient() {

    if (!patientData.fullName) {

        showNotification(
            "No patient request is available for verification.",
            "error"
        );

        return;

    }


    patientData.verified = true;

    patientData.rejected = false;


    savePatient();


    updateAllDashboards();


    showNotification(
        "Patient request has been verified successfully."
    );

}


function rejectPatient() {

    if (!patientData.fullName) {

        showNotification(
            "No patient request is available.",
            "error"
        );

        return;

    }


    const confirmed =
        confirm(
            "Are you sure you want to reject this patient request?"
        );


    if (!confirmed) {
        return;
    }


    patientData.rejected = true;

    patientData.verified = false;


    savePatient();


    updateAllDashboards();


    showNotification(
        "Patient request has been rejected.",
        "error"
    );

}


/* =========================================================
   HOSPITAL BUTTON EVENTS
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const approvePatientBtn =
            document.getElementById(
                "approvePatientBtn"
            );


        const rejectBtn =
            document.querySelector(
                ".reject-btn"
            );


        if (approvePatientBtn) {

            approvePatientBtn.addEventListener(
                "click",
                approvePatient
            );

        }


        if (rejectBtn) {

            rejectBtn.addEventListener(
                "click",
                rejectPatient
            );

        }

    }
);


/* =========================================================
   DEMO VERIFICATION
   ========================================================= */

function completeDemoVerification() {

    if (!patientData.fullName) {

        showNotification(
            "Please submit a patient request first.",
            "error"
        );

        scrollToSection(
            "patient-registration"
        );

        return;

    }


    showNotification(
        "Hospital is reviewing the medical request...",
        "info"
    );


    setTimeout(function () {

        patientData.verified = true;

        patientData.rejected = false;


        savePatient();


        updateAllDashboards();


        showNotification(
            "Demo verification completed successfully!"
        );

    }, 1200);

}


document.addEventListener(
    "DOMContentLoaded",
    function () {

        const verifyDemoBtn =
            document.getElementById(
                "verifyDemoBtn"
            );


        if (verifyDemoBtn) {

            verifyDemoBtn.addEventListener(
                "click",
                completeDemoVerification
            );

        }

    }
);


/* =========================================================
   SMART SUPPORT MATCHING
   ========================================================= */

function findAvailableSupport() {

    if (!patientData.fullName) {

        showNotification(
            "Please submit a medical support request first.",
            "error"
        );

        scrollToSection(
            "patient-registration"
        );

        return;

    }


    if (!patientData.verified) {

        showNotification(
            "Hospital verification is required before matching support providers.",
            "error"
        );

        return;

    }


    const supportMatches =
        document.getElementById(
            "supportMatches"
        );


    if (!supportMatches) {
        return;
    }


    /* Demo smart matching logic */

    const condition =
        patientData.medicalCondition
            .toLowerCase();


    const expense =
        patientData.monthlyExpense;


    let organizations = [];


    if (
        expense >= 10000
    ) {

        organizations.push({

            name:
                "National Healthcare Assistance Foundation",

            type:
                "Funding Organization",

            match:
                96,

            support:
                "Long-term financial assistance for high recurring medical expenses.",

            icon:
                "fa-hand-holding-heart"

        });

    }


    if (
        patientData.expenseType ===
        "Monthly Medicines" ||
        condition.includes("medicine") ||
        condition.includes("diabetes") ||
        condition.includes("blood pressure")
    ) {

        organizations.push({

            name:
                "Community Medicine Support Network",

            type:
                "Healthcare NGO",

            match:
                94,

            support:
                "Monthly medicine support and recurring treatment assistance.",

            icon:
                "fa-pills"

        });

    }


    organizations.push({

        name:
            "MediCare Community Foundation",

        type:
            "Healthcare NGO",

        match:
            91,

        support:
            "Financial support for verified recurring healthcare requirements.",

        icon:
            "fa-heart-pulse"

    });


    organizations.push({

        name:
            "Partner Pharmacy Concession Program",

        type:
            "Pharmacy Network",

        match:
            88,

        support:
            "Medicine discounts for verified long-term patients.",

        icon:
            "fa-prescription-bottle-medical"

    });


    supportMatches.innerHTML = "";


    organizations.forEach(
        function (organization) {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "support-match-card";


            card.innerHTML = `

                <div class="match-icon">

                    <i class="
                        fa-solid
                        ${organization.icon}
                    "></i>

                </div>

                <h3>

                    ${organization.name}

                </h3>

                <span>

                    ${organization.type}

                </span>

                <p>

                    ${organization.support}

                </p>

                <div class="match-percentage">

                    ${organization.match}% Match

                </div>

            `;


            supportMatches.appendChild(
                card
            );

        }
    );


    showNotification(
        ${organizations.length} suitable support options found for your medical requirement.
    );

}


/* =========================================================
   SMART MATCH BUTTON
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const findSupportBtn =
            document.getElementById(
                "findSupportBtn"
            );


        if (findSupportBtn) {

            findSupportBtn.addEventListener(
                "click",
                findAvailableSupport
            );

        }

    }
);


/* =========================================================
   NGO SUPPORT AMOUNT SELECTION
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const supportButtons =
            document.querySelectorAll(
                ".supportAmount"
            );


        supportButtons.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        supportButtons.forEach(
                            function (item) {

                                item.classList.remove(
                                    "selected"
                                );

                            }
                        );


                        this.classList.add(
                            "selected"
                        );


                        selectedSupportAmount =
                            Number(
                                this.dataset.amount
                            );


                        showNotification(
                            ${formatCurrency(selectedSupportAmount)} monthly support selected.,
                            "info"
                        );

                    }
                );

            }
        );

    }
);


/* =========================================================
   PROVIDE NGO SUPPORT
   ========================================================= */

function provideNGOSupport() {

    if (!patientData.fullName) {

        showNotification(
            "No patient request is available.",
            "error"
        );

        return;

    }


    if (!patientData.verified) {

        showNotification(
            "Only verified patients can receive NGO support.",
            "error"
        );

        return;

    }


    if (
        selectedSupportAmount <= 0
    ) {

        showNotification(
            "Please select a monthly support amount.",
            "error"
        );

        return;

    }


    const currentRemaining =
        getRemainingMonthlyExpense();


    if (
        currentRemaining <= 0
    ) {

        showNotification(
            "The monthly medical requirement is already fully covered.",
            "info"
        );

        return;

    }


    const actualSupport =
        Math.min(
            selectedSupportAmount,
            currentRemaining
        );


    patientData.ngoSupport +=
        actualSupport;


    savePatient();


    updateAllDashboards();


    showNotification(
        ${formatCurrency(actualSupport)} monthly NGO support has been successfully provided.
    );


    selectedSupportAmount = 0;


    document
        .querySelectorAll(
            ".supportAmount"
        )
        .forEach(
            function (button) {

                button.classList.remove(
                    "selected"
                );

            }
        );

}


/* =========================================================
   NGO PROVIDE SUPPORT BUTTON
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const provideSupportBtn =
            document.getElementById(
                "provideSupportBtn"
            );


        if (provideSupportBtn) {

            provideSupportBtn.addEventListener(
                "click",
                provideNGOSupport
            );

        }

    }
);


/* =========================================================
   PHARMACY CONCESSION
   ========================================================= */

function offerPharmacyDiscount() {

    if (!patientData.fullName) {

        showNotification(
            "No patient request is available.",
            "error"
        );

        return;

    }


    if (!patientData.verified) {

        showNotification(
            "Only verified patients can receive pharmacy concessions.",
            "error"
        );

        return;

    }


    const medicineCategory =
        document.getElementById(
            "medicineCategory"
        );


    const discountPercentage =
        document.getElementById(
            "discountPercentage"
        );


    const discountDuration =
        document.getElementById(
            "discountDuration"
        );


    const percentage =
        Number(
            discountPercentage.value
        );


    const discountAmount =
        patientData.monthlyExpense *
        (
            percentage / 100
        );


    /* Do not exceed remaining expense */

    const remainingBeforeDiscount =
        Math.max(
            0,
            patientData.monthlyExpense -
            patientData.ngoSupport
        );


    const actualDiscount =
        Math.min(
            discountAmount,
            remainingBeforeDiscount
        );


    patientData.pharmacyDiscount =
        actualDiscount;


    savePatient();


    updateAllDashboards();


    showNotification(
        ${percentage}% pharmacy concession offered for ${medicineCategory.value} for ${discountDuration.value}. Estimated monthly benefit: ${formatCurrency(actualDiscount)}.
    );

}


/* =========================================================
   PHARMACY BUTTON
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const offerDiscountBtn =
            document.getElementById(
                "offerDiscountBtn"
            );


        if (offerDiscountBtn) {

            offerDiscountBtn.addEventListener(
                "click",
                offerPharmacyDiscount
            );

        }

    }
);


/* =========================================================
   LOAD SAVED PATIENT DATA
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const savedPatient =
            localStorage.getItem(
                "mediSupportPatient"
            );


        if (savedPatient) {

            patientData =
                JSON.parse(
                    savedPatient
                );


            updateAllDashboards();


            calculateExpensePreview();

        }

    }
);


/* =========================================================
   PREVENT NEGATIVE EXPENSE VALUES
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const monthlyExpense =
            document.getElementById(
                "monthlyExpense"
            );


        if (monthlyExpense) {

            monthlyExpense.addEventListener(
                "input",
                function () {

                    if (
                        Number(this.value) < 0
                    ) {

                        this.value = 0;

                    }

                }
            );

        }

    }
);


/* =========================================================
   KEYBOARD SHORTCUT
   Prototype demonstration only
   ========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        /*
        Ctrl + Shift + V
        Simulates verification
        */

        if (
            event.ctrlKey &&
            event.shiftKey &&
            event.key.toLowerCase() === "v"
        ) {

            if (
                patientData.fullName
            ) {

                patientData.verified =
                    true;

                patientData.rejected =
                    false;


                savePatient();


                updateAllDashboards();


                showNotification(
                    "Prototype verification completed."
                );

            }

        }

    }
);
/* =========================================================
   CLICKABLE CARDS - RELIABLE VERSION
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* -----------------------------
       PROBLEM SECTION CARDS
    ------------------------------ */

    const recurringMedicines = document.querySelector(".problem-card:nth-child(1)");
    const longTermTreatment = document.querySelector(".problem-card:nth-child(2)");
    const financialBurden = document.querySelector(".problem-card:nth-child(3)");

    if (recurringMedicines) {
        recurringMedicines.style.cursor = "pointer";

        recurringMedicines.onclick = () => {

            const expenseType =
                document.getElementById("expenseType");

            if (expenseType) {
                expenseType.value = "Monthly Medicines";
            }

            const registration =
                document.getElementById("patient-registration");

            if (registration) {
                registration.scrollIntoView({
                    behavior: "smooth"
                });
            }
        };
    }


    if (longTermTreatment) {
        longTermTreatment.style.cursor = "pointer";

        longTermTreatment.onclick = () => {

            const expenseType =
                document.getElementById("expenseType");

            if (expenseType) {
                expenseType.value = "Regular Treatment";
            }

            const registration =
                document.getElementById("patient-registration");

            if (registration) {
                registration.scrollIntoView({
                    behavior: "smooth"
                });
            }
        };
    }


    if (financialBurden) {
        financialBurden.style.cursor = "pointer";

        financialBurden.onclick = () => {

            const registration =
                document.getElementById("patient-registration");

            if (registration) {
                registration.scrollIntoView({
                    behavior: "smooth"
                });
            }
        };
    }


    /* -----------------------------
       USER CARDS
    ------------------------------ */

    const patientCard =
        document.querySelector(".patient-card");

    const hospitalCard =
        document.querySelector(".hospital-card");

    const ngoCard =
        document.querySelector(".ngo-card");

    const pharmacyCard =
        document.querySelector(".pharmacy-card");


    if (patientCard) {

        patientCard.style.cursor = "pointer";

        patientCard.onclick = function (event) {

            if (
                event.target.closest("button")
            ) {
                return;
            }

            document
                .getElementById("patient-registration")
                .scrollIntoView({
                    behavior: "smooth"
                });
        };
    }


    if (hospitalCard) {

        hospitalCard.style.cursor = "pointer";

        hospitalCard.onclick = function (event) {

            if (
                event.target.closest("button")
            ) {
                return;
            }

            document
                .getElementById("hospital-dashboard")
                .scrollIntoView({
                    behavior: "smooth"
                });
        };
    }


    if (ngoCard) {

        ngoCard.style.cursor = "pointer";

        ngoCard.onclick = function (event) {

            if (
                event.target.closest("button")
            ) {
                return;
            }

            document
                .getElementById("ngo-dashboard")
                .scrollIntoView({
                    behavior: "smooth"
                });
        };
    }


    if (pharmacyCard) {

        pharmacyCard.style.cursor = "pointer";

        pharmacyCard.onclick = function (event) {

            if (
                event.target.closest("button")
            ) {
                return;
            }

            document
                .getElementById("pharmacy-dashboard")
                .scrollIntoView({
                    behavior: "smooth"
                });
        };
    }

});
