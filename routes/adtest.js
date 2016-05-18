var adminManager = require('./adminManager');

adminManager.update_hotel_info(4, '陆宽大酒店', '广东', '深圳', '南山区青梧路', 5, '一家很棒的酒店', '18868107501', function(err) {
  if(err)
    console.log(err);
  else
    console.log('success');
})

adminManager.update_airticket_info(1, '杭州', '萧山', '深圳', '2016-6-1 14:00', '2016-6-1 15:30', 200, 200, 480, function(err) {
  if(err)
    console.log(err);
  else
    console.log('success');
})
