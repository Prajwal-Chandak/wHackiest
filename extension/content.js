// ScholarSaathi Content Script
(function () {
  console.log("ScholarSaathi Assistant injected into page.");

  // Create floating quick launcher widget
  const launcher = document.createElement('div');
  launcher.id = 'scholarsaathi-floating-launcher';
  launcher.innerHTML = `
    <div class="ss-launcher-btn" title="Open ScholarSaathi Assistant">
      <div class="ss-orb"></div>
      <span class="ss-badge">AI</span>
    </div>
  `;
  document.body.appendChild(launcher);

  launcher.addEventListener('click', () => {
    // Notify background or open panel
    alert("ScholarSaathi: To open the side panel, click the ScholarSaathi extension icon in your Chrome toolbar or press Alt+Shift+S.");
  });

  // Listen for actions from side panel
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'AUTOFILL') {
      const data = request.data || {};
      let filledCount = 0;

      // Smart input matching
      const inputs = document.querySelectorAll('input, select, textarea');
      inputs.forEach((input) => {
        const id = (input.id || '').toLowerCase();
        const name = (input.name || '').toLowerCase();
        const placeholder = (input.placeholder || '').toLowerCase();
        const combined = `${id} ${name} ${placeholder}`;

        let matchedVal = null;
        if (combined.includes('name') && !combined.includes('father') && !combined.includes('mother')) {
          matchedVal = data.name;
        } else if (combined.includes('income')) {
          matchedVal = data.annualIncome;
        } else if (combined.includes('mobile') || combined.includes('phone')) {
          matchedVal = data.mobile;
        } else if (combined.includes('email')) {
          matchedVal = data.email;
        } else if (combined.includes('father')) {
          matchedVal = data.fatherName;
        } else if (combined.includes('mother')) {
          matchedVal = data.motherName;
        } else if (combined.includes('reg') || combined.includes('usn') || combined.includes('roll')) {
          matchedVal = data.universityRegNo;
        } else if (combined.includes('cgpa')) {
          matchedVal = data.previousCgpa;
        } else if (combined.includes('college')) {
          matchedVal = data.college;
        }

        if (matchedVal) {
          input.value = matchedVal;
          input.dispatchEvent(new Event('input', { bubbles: true }));
          input.dispatchEvent(new Event('change', { bubbles: true }));
          input.classList.add('scholarsaathi-autofill-glow');
          filledCount++;
          setTimeout(() => input.classList.remove('scholarsaathi-autofill-glow'), 2500);
        }
      });

      sendResponse({ status: 'SUCCESS', filledCount });
    }

    if (request.action === 'EXPLAIN_FIELD') {
      // Highlight specific target
      sendResponse({ status: 'OK' });
    }

    return true;
  });
})();
