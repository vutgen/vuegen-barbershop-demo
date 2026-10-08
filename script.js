/* Собирает страницу из config.js. Править не нужно. */
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
function photo(cls,label,image,caption){
  if(image)return '<div class="photo photo--img '+cls+'" style="background-image:url(\''+esc(image)+'\')" role="img" aria-label="'+esc(label)+'">'+(caption?'<span class="photo__label">'+esc(label)+'</span>':'')+'</div>';
  return '<div class="photo '+cls+'" role="img" aria-label="'+esc(label)+'"><span class="photo__label">'+esc(label)+'</span></div>';
}
function digits(p){return String(p).replace(/\D/g,'');}

function build(C){
  var tel='+'+digits(C.wa);
  var serviceNames=[];
  C.services.forEach(function(g){g.items.forEach(function(i){serviceNames.push(i[0]);});});
  (C.extraServices||[]).forEach(function(s){serviceNames.push(s);});

  var h='';
  h+='<header class="topbar"><div class="wrap topbar__in"><a href="#top" class="logo">'+esc(C.name)+'<span>'+esc(C.nameSuffix)+'</span></a>'+
     '<nav class="nav">'+(C.about?'<a href="#about">О нас</a>':'')+'<a href="#prices">Цены</a>'+(C.team&&C.team.length?'<a href="#team">Мастера</a>':'')+'<a href="#works">Работы</a><a href="#how">Как записаться</a><a href="#why">Без переписки</a><a href="#faq">Вопросы</a><a href="#contacts">Контакты</a></nav>'+
     '<a class="btn btn--small" href="#booking">Записаться</a></div></header><main id="top">';

  var facts='';
  if(C.rating)facts+='<li><b>'+esc(C.rating)+'</b> '+esc(C.ratingSource)+'</li>';
  C.hero.facts.forEach(function(f){facts+='<li><b>'+esc(f.big)+'</b> '+esc(f.small)+'</li>';});
  h+='<section class="hero"><div class="wrap hero__in"><div class="hero__text"><p class="tag">'+esc(C.city)+' · '+esc(C.address)+'</p>'+
     '<h1>'+C.hero.title+'</h1><p class="lead">'+esc(C.hero.lead)+'</p>'+
     '<div class="hero__btns"><a class="btn" href="#booking">Записаться онлайн</a><a class="btn btn--ghost" href="#prices">Смотреть цены</a></div>'+
     '<ul class="hero__facts">'+facts+'</ul></div>'+photo('hero__pic','фото салона / работы мастера',C.hero.image)+'</div></section>';


  if(C.about){
    h+='<section class="section section--soft" id="about"><div class="wrap about"><div><h2>'+esc(C.about.title)+'</h2>'+C.about.text.map(function(t){return '<p>'+esc(t)+'</p>';}).join('')+
       (C.about.points?'<ul class="points">'+C.about.points.map(function(p){return '<li>'+esc(p)+'</li>';}).join('')+'</ul>':'')+'</div>'+photo('about__pic','О нас',C.about.image)+'</div></section>';
  }
  h+='<section class="section" id="prices"><div class="wrap"><h2>Услуги и цены</h2><p class="sub">Цены видны сразу — без звонков и «уточнений в личке».</p><div class="cards">';
  C.services.forEach(function(g){
    h+='<article class="card'+(g.accent?' card--accent':'')+'"><h3>'+esc(g.title)+'</h3>'+(g.note?'<p class="card__note">'+esc(g.note)+'</p>':'')+'<ul class="price">';
    g.items.forEach(function(i){h+='<li><span>'+esc(i[0])+'</span><b>'+esc(i[1])+'</b></li>';});
    h+='</ul>'+(g.foot?'<p class="card__note small">'+esc(g.foot)+'</p>':'')+'</article>';
  });
  h+='</div><p class="note">'+esc(C.priceNote)+' <a href="#booking">Записаться →</a></p></div></section>';


  if(C.team&&C.team.length){
    h+='<section class="section section--soft" id="team"><div class="wrap"><h2>Мастера</h2><p class="sub">Выберите мастера и запишитесь на удобное время.</p><div class="team">';
    C.team.forEach(function(m){h+='<article class="member">'+photo('member__pic',m.name,m.image)+'<h3>'+esc(m.name)+'</h3><p>'+esc(m.role)+'</p></article>';});
    h+='</div></div></section>';
  }
  h+='<section class="section" id="works"><div class="wrap"><h2>Работы мастера</h2><p class="sub">Хорошо видно, что получится, ещё до визита.</p><div class="gallery">';
  C.gallery.forEach(function(g){h+=photo('',g.label,g.image,true);});
  h+='</div></div></section>';

  h+='<section class="section" id="how"><div class="wrap"><h2>Как записаться</h2><ol class="steps">';
  C.steps.forEach(function(s){h+='<li><b>'+esc(s[0])+'</b><span>'+esc(s[1])+'</span></li>';});
  h+='</ol></div></section>';

  h+='<section class="section section--soft" id="why"><div class="wrap"><h2>Без переписки в личке</h2><p class="sub">Ответы на вопросы, которые обычно задают мастеру, — прямо на сайте.</p><div class="cards">';
  C.why.forEach(function(w){h+='<article class="card"><h3>'+esc(w[0])+'</h3><p class="card__note">'+esc(w[1])+'</p></article>';});
  h+='</div></div></section>';

  h+='<section class="section" id="booking"><div class="wrap booking"><div><h2>Онлайн-запись</h2>'+
     '<p class="sub">Выберите день — покажем свободные часы. Заявка откроется в WhatsApp мастера уже готовой, останется нажать «Отправить».</p>'+
     '<p class="demo">'+esc(C.demoNote)+'</p><ul class="hours"><li>'+esc(C.hoursDays)+': '+esc(C.hours)+'</li><li>'+esc(C.address)+'</li><li>'+esc(C.phone)+'</li></ul></div>'+
     '<form class="form" id="bookingForm" novalidate><label>Имя<input name="name" required autocomplete="name" placeholder="Как к вам обращаться"></label>'+
     '<label>Услуга<select name="service">'+serviceNames.map(function(n){return '<option>'+esc(n)+'</option>';}).join('')+'</select></label>'+
     '<div class="row"><label>Дата<input type="date" name="date" id="date" required></label><label>Свободное время<select name="time" id="time"></select></label></div>'+
     '<label>Комментарий<textarea name="comment" rows="2" placeholder="Пожелания (необязательно)"></textarea></label>'+
     '<button class="btn" type="submit">Записаться</button><p class="form__err" id="err" hidden></p></form></div></section>';

  h+='<section class="section" id="faq"><div class="wrap"><h2>Частые вопросы</h2>';
  C.faq.forEach(function(f){h+='<details><summary>'+esc(f[0])+'</summary><p>'+esc(f[1])+'</p></details>';});
  h+='</div></section>';

  h+='<section class="section section--soft" id="contacts"><div class="wrap contacts"><div><h2>Контакты</h2>'+
     '<p><b>Адрес:</b> '+esc(C.city)+', '+esc(C.address)+'</p><p><b>Телефон / WhatsApp:</b> <a href="tel:'+tel+'">'+esc(C.phone)+'</a></p>'+
     '<p><b>Режим работы:</b> '+esc(C.hoursDays)+' '+esc(C.hours)+'</p>'+
     (C.vk?'<p><b>ВКонтакте:</b> <a href="https://vk.com/'+esc(C.vk)+'" target="_blank" rel="noopener">vk.com/'+esc(C.vk)+'</a></p>':'')+
     '<div class="hero__btns"><a class="btn" href="https://wa.me/'+digits(C.wa)+'" target="_blank" rel="noopener">Написать в WhatsApp</a>'+
     (C.gis?'<a class="btn btn--ghost" href="'+esc(C.gis)+'" target="_blank" rel="noopener">Открыть в 2ГИС</a>':'')+'</div></div>'+
     photo('map','карта: '+C.address,'')+'</div></section></main>'+
     '<footer class="footer"><div class="wrap">© '+esc(C.name)+', '+esc(C.city)+' · '+esc(C.footer)+'</div></footer>';
  return h;
}

function busyFor(iso){var n=0;for(var i=0;i<iso.length;i++)n=(n*31+iso.charCodeAt(i))%9973;var b={};for(var k=0;k<4;k++)b[11+((n+k*5)%9)]=1;return b;}

function init(C){
  document.title=C.seo.title;
  var m=document.querySelector('meta[name=description]');if(m)m.setAttribute('content',C.seo.description);
  if(C.noindex){var r=document.createElement('meta');r.name='robots';r.content='noindex';document.head.appendChild(r);}
  document.documentElement.setAttribute('data-theme',C.theme||'barber');
  if(C.accent){document.documentElement.style.setProperty('--gold',C.accent);document.documentElement.style.setProperty('--gold-d',C.accent);}
  document.getElementById('app').innerHTML=build(C);
  var time=document.getElementById('time'),date=document.getElementById('date');
  function fill(){
    var b=busyFor(date.value||'x'),free=0;time.innerHTML='';
    var now=new Date(),isToday=date.value===now.getFullYear()+'-'+String(now.getMonth()+1).padStart(2,'0')+'-'+String(now.getDate()).padStart(2,'0');
    for(var h=C.hoursFrom;h<C.hoursTo;h++){
      if(b[h])continue;
      if(isToday&&h<=now.getHours())continue;
      var o=document.createElement('option');o.textContent=(h<10?'0':'')+h+':00';time.appendChild(o);free++;
    }
    if(!free){var o2=document.createElement('option');o2.textContent='Нет свободных часов — выберите другой день';o2.disabled=true;time.appendChild(o2);}
  }
  var t=new Date(),iso=t.getFullYear()+'-'+String(t.getMonth()+1).padStart(2,'0')+'-'+String(t.getDate()).padStart(2,'0');
  date.min=iso;date.value=iso;fill();
  if(time.options.length&&time.options[0].disabled){var tm=new Date(t.getTime()+86400000);date.value=tm.getFullYear()+'-'+String(tm.getMonth()+1).padStart(2,'0')+'-'+String(tm.getDate()).padStart(2,'0');fill();}
  date.addEventListener('change',fill);
  document.getElementById('bookingForm').addEventListener('submit',function(e){
    e.preventDefault();var f=e.target,err=document.getElementById('err');
    if(!f.name.value.trim()||!f.date.value||!f.time.value){err.textContent='Укажите имя, дату и свободное время.';err.hidden=false;return;}
    err.hidden=true;var d=f.date.value.split('-').reverse().join('.');
    var msg='Здравствуйте! Хочу записаться в «'+C.name+'».\nУслуга: '+f.service.value+'\nДата: '+d+', '+f.time.value+'\nИмя: '+f.name.value.trim()+(f.comment.value.trim()?'\nКомментарий: '+f.comment.value.trim():'');
    window.open('https://wa.me/'+digits(C.wa)+'?text='+encodeURIComponent(msg),'_blank','noopener');
  });
}
if(typeof module!=='undefined'){module.exports={build:build,busyFor:busyFor};}
else{init(window.CONFIG);}
