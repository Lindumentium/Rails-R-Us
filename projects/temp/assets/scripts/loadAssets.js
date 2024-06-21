fetch('assets/paths.json')
  .then(response => response.json())
  .then(data => {
    const head = document.head;

    // Load CSS files
    data.css.forEach(path => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = path;
      head.appendChild(link);
    });

    // Load JS files
    data.js.forEach(path => {
      const script = document.createElement('script');
      script.src = path;
      script.defer = true;
      head.appendChild(script);
    });
  })
  .catch(error => console.error('Error loading assets:', error));
