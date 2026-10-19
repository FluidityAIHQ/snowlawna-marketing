// Run before paint: only an explicit saved choice can override the light default.
export const THEME_INIT_SCRIPT = `(function(){var d=false;try{d=localStorage.getItem("theme")==="dark";}catch(e){}var t=d?"dark":"light";var r=document.documentElement;r.dataset.theme=t;r.classList.toggle("dark",d);r.classList.toggle("light",!d);r.style.colorScheme=t;})();`;
