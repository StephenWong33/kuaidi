  function myShowMemo(t,tid,sellerFlag,sellerMemo,buyerMessage,dealType,cmFlag){
    // 查询
  var flag = 1;
    if(dealType == "fenxiao"){//分销平台
      flag = 2;
    }else if(dealType == "jinxiao"){//jinxiao平台
      flag = 3;
    }
    var seller_flag=sellerFlag;
    var seller_memo =sellerMemo;
    var buyer_message =buyerMessage;
    $("#tids1").val(tid);
    $("#tids2").val(t);
    if ($("#editMemo .cmFlagDiv3 li[data-value='"+cmFlag+"']").html()) {
      $("#cmOneLogoFlag").val(cmFlag);
      $("#editMemo .cmFlagspan").html($("#editMemo .cmFlagDiv3 li[data-value='"+cmFlag+"']").html());
    } else {
      $("#cmOneLogoFlag").val(0);
      $("#editMemo .cmFlagspan").html('无');
    }
    $("#isFxFlag1").val(flag);
    var opFlag = document.getElementsByName("opFlag");
    $("input:radio[name=opFlag][value="+seller_flag+"]").attr("checked",true);
    $('#tidmemo').html(tid);
    $("#memoInfo").val(seller_memo);
    $("#buyerMessageEdit1").html(buyer_message);
//  编辑
var tids = $("#tids1").val();
    var tids1 = $("#tids2").val();
    var tradetids = $('#tmpTids'+tids1).val();
    var memoInfo = $("#memoInfo").val();
    var opFlag = $("input[name='opFlag']:checked").val();
    var flag = $("#isFxFlag1").val();
    memoInfo=memoInfo.replace(/'/g, "‘").replace(/\"/g, "“").replace(/\\/g,"＼").replace(/\+/g,"＋").replace(/%/g,"％").replace(/-/g,"－");
    $.ajax({
      type:"post",
      url:tmpPath+"/operation/Print?method=editMemo",
      data:{
        'from':pubFrom,
        'tids':tids,
        'opFlag':opFlag,
        'memoInfo':memoInfo,
        'isFxFlag':flag,
        'tradetids':tradetids,
        'tids1':tids1,
        'cmFlag': $('#cmOneLogoFlag').val(),
        'cmMemo':$('.cmFlagDiv3 .cmFlagspan').text()
      },
      dataType : "text",
      success:function(msg){
        var res = msg.split("#%");
        if(res[0] == "1"){
          dialogTip("修改备注成功",1);
          $('#divsellermemo'+tids1).html(res[1]);
          $('#divcmmemo'+tids1).html(res[2]);
        }else{
          dialogTip(msg,1);
        }
      }
    })
  }
