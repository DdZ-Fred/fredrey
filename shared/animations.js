function animHeaderFlagPF() {
  $('.headerContentLeftContainer .flag')
    .transition({
      animation: 'flash',
      duration: 200,
    });
}

function animHeaderDev() {
  $('.headerContentRightContainer .dev')
    .transition({
      animation: 'slide right in',
      duration: 100,
      onComplete: () => animHeaderFlagPF(),
    });
}

function animHeaderEnd() {
  $('.headerContentRightContainer .end')
    .transition({
      animation: 'slide right in',
      duration: 100,
      onComplete: () => animHeaderDev(),
    });
}

function animHeaderFront() {
  $('.headerContentRightContainer .front')
    .transition({
      animation: 'slide right in',
      duration: 200,
      onComplete: () => animHeaderEnd(),
    });
}

function animHeaderFullName() {
  $('.headerContentLeftContainer h3')
    .transition({
      animation: 'tada',
      duration: 500,
      onComplete: () => animHeaderFront(),
    });
}

export function animHeader() {
  $('.ui.blue.card')
    .transition({
      animation: 'fly down in',
      onComplete: () => animHeaderFullName(),
    });
}
