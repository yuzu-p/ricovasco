		// 입력 제한
		$(document).on("keyup", "input:text[numberOnly]", function() {
			$(this).val( $(this).val().replace(/[^0-9]/gi,"") );
			});

		//배열 관리
		answerArr = ['09', '22', '39', '51', '76', '82'];

		$(function(){
			$('.bet_button').on('click', function(){
				//값들의 갯수 -> 배열 길이를 지정
				var grpl = $("input[name=arr]").length;
				//배열 생성
				var grparr = new Array(grpl);
				//배열에 값 주입
				for(var i=0; i<grpl; i++){                          
						grparr[i] = $("input[name=arr]").eq(i).val();
				}
				console.log("초기값" + grparr);
				// 배열 정렬
				grparr.sort(function(a,b) {
					return a-b;
				});
				console.log("정렬값" + grparr);
				// 배열 비교
				lookArr(grparr, answerArr);
			});
		});

		function lookArr (a, b) {
			for (i=0; i<a.length; i++) {
				if (a[i] != b[i]) {
					openModal('modal2');
					return "false"
				} else {
					continue;
				}
			}
			openModal('modal1');
		}

function openModal(modalname){
  document.get
  $("#modal").fadeIn(300);
  $("."+modalname).fadeIn(300);
}

$("#modal").on('click',function(){
  $("#modal").fadeOut(300);
  $(".modal-con").fadeOut(300);
});