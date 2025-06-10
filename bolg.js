$(document).ready(function () {
  $('.category').click(function (e) {
    e.preventDefault();

    const selectedCategory = $(this).data('category');

    if (selectedCategory === 'all') {
      $('.post').show();
    } else {
      $('.post').hide();
      $(`.post[data-category="${selectedCategory}"]`).show();
    }
  });
});
