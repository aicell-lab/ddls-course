import * as params from '@params';

console.log('slide params: ', params)

// Enable core slide features.
var enabledPlugins = [RevealMarkdown, RevealHighlight, RevealSearch, RevealNotes, RevealMath, RevealMath.KaTeX, RevealZoom];
const isObject = function (o) {
  return o === Object(o) && !isArray(o) && typeof o !== 'function';
};

const isArray = function (a) {
  return Array.isArray(a);
};

const toCamelCase = function (s) {
  return s.replace(/([-_][a-z])/gi, function (term) {
    return term.toUpperCase().replace('-', '').replace('_', '');
  });
};

const keysToCamelCase = function (o) {
  if (isObject(o)) {
    const n = {};

    Object.keys(o).forEach(function (k) {
      n[toCamelCase(k)] = keysToCamelCase(o[k]);
    });

    return n;
  } else if (isArray(o)) {
    return o.map(function (i) {
      return keysToCamelCase(i);
    });
  }

  return o;
};

// reveal configurations can be included in front matter under slides.reveal
var pluginOptions = {};
if (params.slides && typeof params.slides.reveal_options !== 'undefined') {
  pluginOptions = params.slides.reveal_options;
}

pluginOptions = keysToCamelCase(pluginOptions);

//enable menu by default if not set
if (typeof pluginOptions.menu_enabled === 'undefined') {
  pluginOptions.menu_enabled = true;
}

// configure menu if enabled
if (pluginOptions.menu_enabled) {
  enabledPlugins.push(RevealMenu);
}

pluginOptions['plugins'] = enabledPlugins;

let currentSlidesContent = null
let defaultTheme = params.slides && params.slides.theme || "black";
let defaultTransition = 'fade'
let customEventListeners = {}
const mainElem = document.querySelector('.reveal');
// add event listener hook to keep track of the event added later
let oldRevealAddEventListener = mainElem.addEventListener
mainElem.addEventListener = (event, handler) => {
  if (!customEventListeners[event])
    customEventListeners[event] = [handler]
  else
    customEventListeners[event].push(handler)
  oldRevealAddEventListener.apply(mainElem, [event, handler])
}

function resetCustomEventListeners() {
  for (let evt in customEventListeners) {
    for (let handler of customEventListeners[evt]) {
      Reveal.removeEventListener(evt, handler)
    }
  }
  customEventListeners = {}
}

const cyrb53 = function (str, seed = 0) {
  let h1 = 0xdeadbeef ^ seed,
    h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};

function initSplitter() {
  var md; // remember mouse down info
  const direction = "H"
  const first = document.getElementById("slide-editor-container");
  const splitter = document.getElementById('separator');
  const second = document.getElementById("slide-container");
  first.style.display = 'inline-block'
  splitter.style.display = 'inline-block'
  splitter.style.visibility = 'visible'
  splitter.onmousedown = onMouseDown;

  function onMouseDown(e) {
    md = {
      e,
      offsetLeft: splitter.offsetLeft,
      offsetTop: splitter.offsetTop,
      firstWidth: first.offsetWidth,
      secondWidth: second.offsetWidth
    };

    document.onmousemove = onMouseMove;
    document.onmouseup = () => {
      //console.log("mouse up");
      document.onmousemove = document.onmouseup = null;
      // enable mouse events
      const iframes = document.querySelectorAll('iframe')
      for (let iframe of iframes) {
        iframe.style.pointerEvents = 'all';
      }
    }

    // disable mouse events
    const iframes = document.querySelectorAll('iframe')
    for (let iframe of iframes) {
      iframe.style.pointerEvents = 'none';
    }
  }

  function onMouseMove(e) {
    var delta = {
      x: e.clientX - md.e.clientX,
      y: e.clientY - md.e.clientY
    };

    if (direction === "H") // Horizontal
    {
      // Prevent negative-sized elements
      delta.x = Math.min(Math.max(delta.x, -md.firstWidth),
        md.secondWidth);

      splitter.style.left = md.offsetLeft + delta.x + "px";
      first.style.width = (md.firstWidth + delta.x) + "px";
      second.style.width = (md.secondWidth - delta.x) + "px";

      // refresh the layout
      Reveal.layout();
    }
  }

}

function closeSplitter() {
  document.getElementById('slide-editor-container').style.display = "none"
  document.getElementById('separator').style.display = "none"
  document.getElementById("slide-container").style.width = '100%';
  // refresh the layout
  Reveal.layout();
}

async function startRevealJS() {
  // const slides = getUrlParameter('slides') ||
  //   'https://raw.githubusercontent.com/imjoy-team/imjoy-slides/master/slides/imjoy-slides-introduction.md'
  defaultTheme = getUrlParameter('theme') || defaultTheme
  defaultTransition = getUrlParameter('transition') || defaultTransition
  const edit = getUrlParameter('edit')

  let slides = params.permalink;
  if (params.slides && params.slides.content_url) {
    try{
        const url = await githubUrlRaw(params.slides.content_url, ".md") || params.slides.content_url;
        slides = url;
        const response = await fetch(url)
        currentSlidesContent = await response.text()
        console.log("Loading content from content url, ignoring source in the page...")
    }
    catch(e){
        alert(`Failed to load slides source from ${params.slides.content_url}`);
    }
  }
  else{
    currentSlidesContent = document.getElementById("raw-slide-content").value;   
  }

  await initializeRevealJS(currentSlidesContent, defaultTheme, defaultTransition, getUrlParameter('number'));

  const baseUrl = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '');
  await app.imjoy.pm
    .reloadPluginRecursively({
      uri: "https://raw.githubusercontent.com/imjoy-team/imjoy-slides/master/assets/SlideEditor.imjoy.html"// baseUrl + "/assets/SlideEditor.imjoy.html"
    });

  const storageKey = slides ? cyrb53(slides) : '';
  app.addMenuItem({
    label: "✏️ Edit Slides",
    async callback() {
      const p = await api.getPlugin('Slide Editor')
      initSplitter();

      const lastContent = window.localStorage.getItem('config_Slide Editor_imjoy-slides-content' +
        storageKey)
      if (lastContent && lastContent != currentSlidesContent) {
        if (await api.confirm("Would you like to restore the slides you edited last time?")) {
          await p.run({
            data: {
              code: lastContent
            },
            config: {
              window_id: 'slide-editor-container',
              on_close: closeSplitter,
              storage_key: storageKey
            }
          })
          return
        }
      }
      await p.run({
        data: {
          code: currentSlidesContent
        },
        config: {
          window_id: 'slide-editor-container',
          on_close: closeSplitter,
          storage_key: storageKey
        }
      })
    },
  });
  if (edit) {
    // show editor
    const p = await api.getPlugin('Slide Editor')
    initSplitter();
    await p.run({
      data: {
        code: currentSlidesContent
      },
      config: {
        window_id: 'slide-editor-container',
        on_close: closeSplitter,
        storage_key: storageKey
      }
    })
  }
  if (screenfull.enabled) {
    app.addMenuItem({
      label: " ⤡ Full Screen [F]",
      async callback() {
        screenfull.toggle(document.documentElement);
      }
    })
  }
}

async function initializeRevealJS(content, theme, transition, showSlideNumber) {
  resetCustomEventListeners();

  let currentSlide = null
  try {
    const s = Reveal.getCurrentSlide();
    // save current slide position
    currentSlide = Reveal.getIndices(s);
  } catch (e) {}
  const elm = document.querySelector('.markdown-slide-content')
  const container = elm.parentElement;
  for (var c = 0; c < container.childNodes.length; c++) {
    if (container.childNodes[c] !== elm) {
      container.removeChild(container.childNodes[c--]);
    }
  }
  currentSlidesContent = content

  if (content) {
    try {
      content = runScripts(content)
    } catch (e) {
      console.error(e)
      api.showMessage(`Failed to execute script: ${e}`)
    }
    elm.innerHTML =
      `<section data-markdown data-separator="-----" data-separator-vertical="---"><textarea data-template>${content}</textarea></section>`
  }

  try {
    if (theme) {
      if (theme.startsWith('http')) {
        await addCss(theme)
      } else {
        await addCss(params.cdn_url_reveal + `/dist/theme/${theme}.css`)
      }
    }
  } catch (e) {
    alert('Failed to load theme: ' + theme)
  }
  if (typeof Reveal.removeEventListeners === 'function') Reveal.removeEventListeners();
  // More info about initialization & config:
  // - https://revealjs.com/initialization/
  // - https://revealjs.com/config/
  document.getElementById("slide-loader").style.display = "none";
  pluginOptions.width = "100%";
  pluginOptions.hash = true;
  pluginOptions.slideNumber = showSlideNumber;
  pluginOptions.transition = transition || 'fade';
  pluginOptions.math = {
    mathjax: 'https://cdn.jsdelivr.net/gh/mathjax/mathjax@2.7.8/MathJax.js',
    config: 'TeX-AMS_HTML-full',
    // pass other options into `MathJax.Hub.Config()`
    TeX: {
      Macros: {
        RR: "{\\bf R}"
      }
    }
  }

  Reveal.initialize(pluginOptions);

  try {

    if (currentSlide) {
      Reveal.layout();
      // we need this trick to trigger the slide change event
      Reveal.slide(0, 0, 0);
      setTimeout(() => {
        // restore slide position
        Reveal.slide(currentSlide.h, currentSlide.v, currentSlide.f);
      }, 0)
      Reveal.sync();
    }

  } catch (ex) {
    console.error(ex)
  }

  Reveal.on('slidechanged', event => {
    // clean up embedded window
    for (let w of app.allWindows) {
      if (!w.dialog && !w.window_id.startsWith('plugin_window_') && w.window_id !==
        'slide-editor-container') {
        w.close()
      }
    }
  });

  makeSlideScrollable();


// Disable Mermaid by default.
if (typeof params.slides.diagram === 'undefined') {
    params.slides.diagram = false;
  }
  
  // Configure Mermaid only if diagrams are enabled.
  if (params.slides.diagram) {
    //mermaid options
    // mermaid: front matter configuration can be used to set mermaid options
    // You can also use directives (see mermaid documentation)
    var mermaidOptions = {};
    if (typeof params.slides.diagram_options !== 'undefined') {
      mermaidOptions = params.slides.diagram_options;
    }
  
    // `startOnLoad` must be false since diagrams are lazily rendered.
    mermaidOptions['startOnLoad'] = false;
  
    mermaid.initialize(mermaidOptions);
  
    // Lazily render Mermaid diagrams within Reveal.JS slides
    // See: https://github.com/hakimel/reveal.js/issues/2863#issuecomment-1107444425
    let renderMermaidDiagrams = function renderMermaidDiagrams(event) {
  
      let mermaidDivs = event.currentSlide.querySelectorAll('.mermaid:not(.done)');
      let indices = Reveal.getIndices();
      let pageno = `${indices.h}-${indices.v}`
  
      mermaidDivs.forEach(function (mermaidDiv, i) {
  
        let insertSvg = function (svgCode) {
          mermaidDiv.innerHTML = svgCode;
          mermaidDiv.classList.add('done');
        };
        let graphDefinition = mermaidDiv.textContent;
        mermaid.mermaidAPI.render(`mermaid${pageno}-${i}`, graphDefinition, insertSvg);
      });
      Reveal.layout();
    };
  
    Reveal.on('ready', event => renderMermaidDiagrams(event));
    Reveal.on('slidechanged', event => renderMermaidDiagrams(event));
  }
  
}

loadImJoyBasicApp({
  process_url_query: true,
  show_window_title: false,
  show_progress_bar: true,
  show_empty_window: true,
  menu_style: {
    position: "absolute",
    right: 0,
    top: "4px"
  },
  window_style: {
    width: '100%',
    height: '100%'
  },
  main_container: null,
  menu_container: "menu-container",
  window_manager_container: "window-container",
  imjoy_api: {} // override some imjoy API functions here
}).then(async app => {
  // get the api object from the root plugin
  const api = app.imjoy.api;
  app.$on('window-size-pos-changing', (changing) => {
    const iframes = document.querySelectorAll('.reveal iframe')
    for (let iframe of iframes) {
      iframe.style.pointerEvents = changing ? 'none' : 'all';
    }
  })
  // if you want to let users to load new plugins, add a menu item
  app.addMenuItem({
    label: "➕ Load Plugin",
    callback() {
      const uri = prompt(
        `Please type a ImJoy plugin URL`,
        "https://github.com/imjoy-team/imjoy-plugins/blob/master/repository/ImageAnnotator.imjoy.html"
      );
      if (uri) app.loadPlugin(uri);
    },
  });

  await api.registerService({
    name: 'ImJoy Slides',
    type: '#imjoy-slides',
    async show(content, config) {
      const {
        theme,
        transition
      } = config || {}
      await initializeRevealJS(content, theme || defaultTheme, transition || defaultTransition)
    }
  })
  // expose global variables
  window.api = api;
  window.imjoy = app.imjoy
  window.app = app;
  // TODO: hacky solution, need further investigation
  imjoy.event_bus.on("add_window", w => {
    if(imjoy.wm.windows.indexOf(w)<0){
      imjoy.wm.windows.push(w);
    }
  });
  await startRevealJS();
  app.imjoy.pm
    .reloadPluginRecursively({
      uri: "https://imjoy-team.github.io/jupyter-engine-manager/Jupyter-Engine-Manager.imjoy.html"
    })
    .then(enginePlugin => {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const engine = urlParams.get("engine");
      const spec = urlParams.get("spec");
      if (engine) {
        enginePlugin.api
          .createEngine({
            name: "MyCustomEngine",
            nbUrl: engine,
            url: engine.split("?")[0]
          })
          .then(() => {
            console.log("Jupyter Engine connected!");
          })
          .catch(e => {
            console.error("Failed to connect to Jupyter Engine", e);
          });
      } else {
        enginePlugin.api
          .createEngine({
            name: "MyBinder Engine",
            url: "https://mybinder.org",
            spec: spec || "oeway/imjoy-binder-image/master"
          })
          .then(() => {
            console.log("Binder Engine connected!");
          })
          .catch(e => {
            console.error("Failed to connect to MyBinder Engine", e);
          });
      }
    });
  app.addMenuItem({
    label: "ℹ️ Github",
    callback() {
      window.open("https://github.com/imjoy-team/imjoy-slides#readme")
    }
  })
}).catch(e => {
  console.error(e)
  startRevealJS();
})