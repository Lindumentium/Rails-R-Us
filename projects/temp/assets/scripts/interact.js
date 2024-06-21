let markers = [];
let currentMarker = null;
const demoImage = document.getElementById('homeDemoImage');
const gameImage = document.getElementById('gameImage');
const gameTabButton = document.querySelector('[data-page="Game"]');

interact('.draggable, .circle').draggable({
  inertia: true,
  modifiers: [
    interact.modifiers.restrictRect({
      restriction: 'parent',
      endOnly: true
    })
  ],
  autoScroll: true,
  onmove: dragMoveListener,
  onend: function (event) {
    const textEl = event.target.querySelector('p');
    textEl && (textEl.textContent = 
      'moved a distance of ' +
      (Math.sqrt((Math.pow(event.pageX - event.x0, 2) +
                  Math.pow(event.pageY - event.y0, 2) | 0)))
        .toFixed(2) + 'px');
  }
});

interact('.dropzone').dropzone({
  accept: '.draggable, .circle',
  overlap: 0.5,
  ondropactivate: function (event) {
    event.target.classList.add('drop-active');
  },
  ondragenter: function (event) {
    var draggableElement = event.relatedTarget,
        dropzoneElement = event.target;
    dropzoneElement.classList.add('drop-target');
    draggableElement.classList.add('can-drop');
  },
  ondragleave: function (event) {
    event.target.classList.remove('drop-target');
    event.relatedTarget.classList.remove('can-drop');
  },
  ondrop: function (event) {
    currentMarker = event.relatedTarget;
    markers.push(currentMarker);
    checkTutorialCompletion();
  },
  ondropdeactivate: function (event) {
    event.target.classList.remove('drop-active');
    event.target.classList.remove('drop-target');
  }
});

function dragMoveListener(event) {
  var target = event.target;
  var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
  var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
  target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
  target.setAttribute('data-x', x);
  target.setAttribute('data-y', y);
}

function recallMarker() {
  if (markers.length > 0) {
    const marker = markers.pop();
    marker.style.transform = '';
    marker.removeAttribute('data-x');
    marker.removeAttribute('data-y');
  }
}

function recallAllMarkers() {
  markers.forEach(marker => {
    marker.style.transform = '';
    marker.removeAttribute('data-x');
    marker.removeAttribute('data-y');
  });
  markers = [];
}

function addComment() {
  if (currentMarker) {
    const comment = document.getElementById('commentInput').value;
    const commentNode = document.createElement('div');
    commentNode.textContent = comment;
    commentNode.style.position = 'absolute';
    commentNode.style.top = currentMarker.getAttribute('data-y') + 'px';
    commentNode.style.left = currentMarker.getAttribute('data-x') + 'px';
    document.body.appendChild(commentNode);
  }
}

function submitMarkers() {
  openPage('Results', document.querySelector('[data-page="Results"]'), 'orange');
}

function checkTutorialCompletion() {
  tutorialCompleted = true;
  gameTabButton.onclick = function() {
    openPage('Game', this, 'green');
  };
}
