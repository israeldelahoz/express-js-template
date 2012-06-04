(function($) {

  if (!$ || !$['fn']) throw new Error('jQuery library is required.');

  var ujs = {
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote]',
    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = link.attr("href");
      var method = link.data('method') || "GET",
      target = link.attr('target'),
      form = $('<form method="post" action="' + href + '"></form>'),
      metadata_input = '<input name="_method" value="' + method + '" type="hidden" />';

      if (target) { form.attr('target', target); }

      form.hide().append(metadata_input).appendTo('body');
      form.submit();
    }, 
    
    processLinks: function (){
      $(ujs.linkClickSelector).live("click", ujs.linkEvent);
    },
    
    linkEvent: function (){
      event.preventDefault();
      var link = $(this);
      if(link.data("confirm")){
        var confirm = window.confirm(link.data("confirm"));
        if(confirm){
          ujs.handleMethod(link);
        }
      }else{
        ujs.handleMethod(link);
      }
    },
    
    init: function(){
      ujs.processLinks();
    }
  }

  $(document).ready(ujs.init);
  })(jQuery);