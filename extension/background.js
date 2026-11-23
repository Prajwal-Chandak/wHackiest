// ScholarSaathi Background Service Worker (Manifest V3)

// Configure extension action click to open side panel automatically
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error("ScholarSaathi sidePanel error:", error));

chrome.runtime.onInstalled.addListener(() => {
  console.log("ScholarSaathi AI Assistant extension installed.");
  
  // Initialize default student profile in chrome.storage
  chrome.storage.local.get(['scholarsaathi_profile'], (result) => {
    if (!result.scholarsaathi_profile) {
      chrome.storage.local.set({
        scholarsaathi_profile: {
          name: "Aarav Sharma",
          dob: "2004-05-14",
          gender: "Male",
          mobile: "+91 98765 43210",
          email: "aarav.sharma24@gmail.com",
          state: "Karnataka",
          college: "Bangalore Institute of Technology, Bengaluru",
          course: "B.Tech Computer Science & Engineering",
          currentYear: "3rd Year (5th Semester)",
          fatherName: "Ramesh Sharma",
          motherName: "Sunita Sharma",
          annualIncome: "180000",
          category: "OBC (Category-3A)",
          universityRegNo: "1BI22CS042",
          previousCgpa: "8.74",
        }
      });
    }
  });
});

// Relay messages between Side Panel and Content Script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'PING') {
    sendResponse({ status: 'PONG', version: '1.0.0' });
  }
  return true;
});
