  const content = document.getElementById('content');
  const candle = document.getElementById('candle');
  const flame = document.getElementById('flame');

  const candleMaxHeight = 250; // px, max candle height
  const candleMinHeight = 60;  // px, minimum candle height when burnt down

  function onScroll() {
    const scrollTop = content.scrollTop;
    const scrollHeight = content.scrollHeight - content.clientHeight;
    let progress = scrollHeight === 0 ? 0 : scrollTop / scrollHeight;
    if (progress > 1) progress = 1;
    if (progress < 0) progress = 0;

    // Update candle height descending from max to min as scroll increases
    let newHeight = candleMaxHeight - (candleMaxHeight - candleMinHeight) * progress;
    candle.style.height = newHeight + 'px';

    // Update wick position relative to candle height
    const wick = candle.nextElementSibling;
    wick.style.bottom = newHeight + 'px';

    // Update flame position
    flame.style.bottom = (newHeight + 25) + 'px';

    // Flame brightness and opacity fade: bright and big at top, dim and vanish at bottom
    let flameOpacity = 1 - progress * 1.1; // fade faster
    if (flameOpacity < 0) flameOpacity = 0;
    flame.style.opacity = flameOpacity;

    // Change candle wax color to darker when burnt (if near bottom)
    if (progress > 0.95) {
      candle.classList.add('burned');
      flame.classList.add('burned');
    } else {
      candle.classList.remove('burned');
      flame.classList.remove('burned');
    }
  }

  content.addEventListener('scroll', onScroll);
  window.addEventListener('load', () => {
    onScroll();
  });