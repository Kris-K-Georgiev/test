// Проверка дали браузърът поддържа Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then((registration) => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch((error) => {
        console.log('Service Worker registration failed:', error);
      });
  });
}

// Инсталиране на приложението
let deferredPrompt;
const installButton = document.getElementById('installButton');

// Събитие за появата на възможността за инсталиране
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault(); // предотвратява показването на автоматичния диалог за инсталиране
  deferredPrompt = e;  // съхранява събитието за по-късно
  installButton.style.display = 'block';  // показва бутона за инсталиране
});

// Когато потребителят кликне върху бутона за инсталиране
installButton.addEventListener('click', () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();  // показва диалога за инсталиране
    deferredPrompt.userChoice.then((choiceResult) => {
      console.log(choiceResult.outcome);  // дали потребителят е избрал да инсталира
      deferredPrompt = null;  // изчистваме събитието след избора
      installButton.style.display = 'none';  // скрива бутона след инсталация
    });
  }
});
