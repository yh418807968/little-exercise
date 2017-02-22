(function(){
				var Util = (function(){
					var prefix = "html5_reader_";
					var StorageGetter = function(key){
						return localStorage.getItem(prefix + key);
					}
					var StorageSetter = function(key,val){
						return localStorage.setItem(prefix + key,val);
					}
					var getJsonp = function(url,callback){
						return $.jsonp({
							url:url,
							cache:true,
							callback:"duokan_fiction_chapter",
							success:function(result){
								var data = $.base64.decode(result);
								var json = decodeURIComponent(escape(data));
								callback(json);
							}
						})
					}
					return{
						getJsonp:getJsonp,
						StorageGetter:StorageGetter,
						StorageSetter:StorageSetter
					}
				})();
				var Dom = {
					top_nav:$("#top-nav"),
					bottom_nav:$(".bottom_nav"),
					font_container:$(".font-container"),
					font:$(".font"),

				}
				var Win = $(window);
				var Doc = $(document);
				var readerModel;
				var readerUI;
				var RootContainer = $("#fiction_container");
				var body = $("body");
				var initFontSize =parseInt(Util.StorageGetter("font_size"))||14;
				var initBackground = Util.StorageGetter("background")||"#e9dfc7";
				RootContainer.css("font-size",initFontSize);
				body.css("background",initBackground);
				//$().append($("<div class='bk-container-current'></div>"));
				function main(){
					//整个项目的入口函数
					readerModel = ReaderModel();
					readerUI = ReaderBaseFrame(RootContainer);
					readerModel.init(function(data){
						readerUI(data);
					});

					EventHanlder();
					
				}
				function ReaderModel(){
					//实现和阅读器相关的数据交互的方法
					var Chapter_id;
					var ChapterTotal;
					var init = function(UIcallback){
						getFictionInfo(function(){
							getCurChaptercontent(Chapter_id,function(data){
								UIcallback && UIcallback(data);
							});
						});
					};
					//获取章节信息
					var getFictionInfo = function(callback){
						$.get("data/chapter.json",function(data){
							//Chapter_id = data.chapters[1].chapter_id;
							Chapter_id = Util.StorageGetter("Chapter_id")||1;
							ChapterTotal = data.chapters.length;
							callback && callback();
						},"json")
					}
					//获取章节内容
					var getCurChaptercontent = function(chapter_id, callback){
						$.get("data/data"+chapter_id+".json",function(data){
							if(data.result == 0){
								var url = data.jsonp;
								Util.getJsonp(url,function(data){
									callback && callback(data);
								});
							}

						},"json")
					}
					//下一章
					var prevChapter = function(UIcallback){
						Chapter_id = parseInt(Chapter_id,10);
						if(Chapter_id == 1){
							//实际中上行代码中的1应为0
							return;
						}
						 Chapter_id -= 1;
						getCurChaptercontent(Chapter_id,UIcallback);
						Util.StorageSetter("Chapter_id",Chapter_id);
					}
					//上一章
					var nextChapter = function(UIcallback){
						Chapter_id = parseInt(Chapter_id,10);
						if(Chapter_id == 4){
							//实际中上行代码中的4应为ChapterTotal
							return;
						}
						Chapter_id += 1;
						getCurChaptercontent(Chapter_id,UIcallback);
						Util.StorageSetter("Chapter_id",Chapter_id);
					}
					return{
						init:init,
						prevChapter:prevChapter,
						nextChapter:nextChapter,
					}
				}

				function ReaderBaseFrame(container){
					//渲染基本的UI结构
					function parseChapterData(jsonData){
						var jsonObj = JSON.parse(jsonData);
						var html = "<h4>" + jsonObj.t + "</h4>";
						for(var i = 0;i < jsonObj.p.length;i++){
							html +="<p>" + jsonObj.p[i] + "</p>";
						}
						return html;
					}
					return function(data){
						container.html(parseChapterData(data));
					}
				}
				function EventHanlder(){
					//交互的事件绑定
					$("#action").click(function(){
						if(Dom.top_nav.css("display") =="none"){
							Dom.bottom_nav.show();
							Dom.top_nav.show();
						}else{
							Dom.bottom_nav.hide();
							Dom.top_nav.hide();
							Dom.font_container.hide();
							Dom.font.find(".font-icon").removeClass("current");
						}
					});
					//点击字体icon，浮出字体调整界面
					Dom.font.click(function(){
						if(Dom.font_container.css("display") =="none"){
							Dom.font_container.show();
							Dom.font.find(".font-icon").addClass("current");

						}else{
							Dom.font_container.hide();
							Dom.font.find(".font-icon").removeClass("current");
						}
					});
					$(".day-night").click(function(){

					});
					//调大字体
					$("#large-font").click(function(){
						if(initFontSize > 20){
							return;
						}
						initFontSize +=1;
						RootContainer.css("font-size",initFontSize);
						Util.StorageSetter("font_size",initFontSize);
					});
					//调小字体
					$("#small-font").click(function(){
						if(initFontSize <10){
							return;
						}
						initFontSize -=1;
						RootContainer.css("font-size",initFontSize);
						Util.StorageSetter("font_size",initFontSize);
					});
					//改变背景
					$(".bk-change").delegate(".bk-container","click",function(){
						// 事件代理实现多个点击事件
						$(".bk-container-current").remove();
						initBackground = $(this).css("background");
						body.css("background",initBackground);
						$(this).append($("<div class='bk-container-current'></div>"));
						Util.StorageSetter("background",initBackground);

					});
					//滚动时浮出层消失
					Win.scroll(function(){
						Dom.bottom_nav.hide();
						Dom.top_nav.hide();
						Dom.font_container.hide();
						Dom.font.find(".font-icon").removeClass("current");
					});
					$("#prev_button").click(function(){
						readerModel.prevChapter(function(data){
							readerUI(data);
						})

					});
					$("#next_button").click(function(){
						readerModel.nextChapter(function(data){
							readerUI(data);
						})
						
					})
				}
				main();
			})();