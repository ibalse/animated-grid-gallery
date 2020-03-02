const animate = (obj, callback) => {
  console.log('PRADEDAM');

  const first = obj.getBoundingClientRect();

  callback();

  const last = obj.getBoundingClientRect();
  const deltaX = first.left - last.left;
  const deltaY = first.top - last.top;
  const deltaW = first.width / last.width;
  const deltaH = first.height / last.height;

  obj.animate([{
    transformOrigin: 'top left',
    transform: `
            translate(${deltaX}px, ${deltaY}px)
            scale(${deltaW}, ${deltaH})
          `
  }, {
    transformOrigin: 'top left',
    transform: 'none'
  }], {
    duration: 300,
    easing: 'ease-in-out',
    fill: 'both'
  });


  console.log('BAIGIAM');
};

export { animate };
