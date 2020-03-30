$(function(){
  function buildHTML(message){
    if ( message.image ) {
      var html = 
        `<div class="main__message" data-message-id=${message.id}>
          <div class="main__message_info">
            <div class="main__message_info_user-name">
              ${message.user_name}
            </div>
            <div class="main__message_info_date">
              ${message.created_at}
            </div>
          </div>
          <div class="main__message_text">
            <p class="main__message_text_content">
              ${message.content}
            </p>
          </div>
          <img src=${message.image} >
        </div>`
      return html;
    } else {
      var html =
        `<div class="main__message" data-message-id=${message.id}>
          <div class="main__message_info">
            <div class="main__message_info_user-name">
              ${message.user_name}
            </div>
            <div class="main__message_info_date">
              ${message.created_at}
            </div>
          </div>
          <div class="main__message_text">
            <p class="main__message_text_content">
              ${message.content}
            </p>
          </div>
        </div>`
      return html;
    };
  };
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main__messages').append(html);
      $('form')[0].reset();
      $('.main__messages').animate({ scrollTop: $('.main__messages')[0].scrollHeight});
      $('.submit-btn').prop("disabled", false);
    })
    .fail(function() {
      alert("メッセージに失敗しました");
    });
  });
  var reloadMessages = function() {
    var last_message_id = $('.main__message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
      });
      $('.main__messages').append(insertHTML);
      $('.main__messages').animate({ scrollTop: $('.main__messages')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});


