$('body').append(
    '<div style="position: fixed; z-index: 1005; bottom: 0; right: 0; background: #fff; border: solid 1px #828286; width: 200px;"> \
            <a href="javascript:void(0);" style="float: right;background:#ccc; color:#000; padding: 5px 10px; text-decoration: none; font-size: 16px; z-index: 4;position: relative;" onclick="$(this).parent().hide()">Close X</a> \
        <style> \
            #pages { padding: 10px 20px 0 20px; font-size: 18px; margin-bottom:0; } \
            #pages a { text-decoration: none; } \
            #pages li { margin: 0; } \
        </style> \
        <ol id="pages"> \
            <li><a href="index.html">Список новостей</a></li> \
            <li><a href="games.html">Список игр</a></li> \
            <li><a href="game.html">Игра</a></li> \
            <li><a href="guide.html">Гайд</a></li> \
            <li><a href="article.html">Статья</a></li> \
        </ol> \
    </div>'
);
