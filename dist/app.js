const experiences=[{id:'soft',title:'Soft Presence',tagline:'A gentle pause to soften and return.',duration:'45 phút',menu:'Khởi An · An Trú · Thường An',description:'Một khoảng dừng nhẹ nhàng để thả lỏng cơ thể, chậm lại và dành sự chú ý cho chính mình.',image:'space.png',alt:'Không gian tĩnh lặng tại ALAYA',cta:'Đặt lịch trải nghiệm'},{id:'deep',title:'Deep Presence',tagline:'A deeper experience for rest and restoration.',duration:'75 phút',menu:'Nhập Lưu · Thuận Lưu · Quy Nguyên',description:'Dành thêm thời gian cho việc nghỉ ngơi, thả lỏng và cảm nhận những chuyển động bên trong, trong một không gian yên tĩnh.',image:'bowls.png',alt:'Chuông xoay đồng dưới ánh nắng',cta:'Đặt lịch trải nghiệm'},{id:'personal',title:'Liệu trình thiết kế riêng',tagline:'Personalized Journey',duration:'Thời lượng theo tư vấn',menu:'Miên Nguyên · Khai Miên · Giải Ưu · Phục Minh · Hồi Sinh',description:'Bắt đầu bằng một cuộc trò chuyện để ALAYA lắng nghe trạng thái hiện tại và cùng bạn lựa chọn trải nghiệm phù hợp.',image:'shelves.png',alt:'Những chiếc chuông được chuẩn bị trong không gian ALAYA',cta:'Trao đổi cùng ALAYA'}];
const $=s=>document.querySelector(s),track=$('#track'),carousel=$('.carousel'),interest=$('#interest'),menuDialog=$('#menu-dialog'),bookingDialog=$('#booking-dialog');
track.innerHTML=experiences.map((e,i)=>`<article class="slide" role="group" aria-roledescription="slide" aria-label="${i+1} trên 3: ${e.title}"><img class="slide-photo" src="assets/${e.image}" alt="${e.alt}" loading="lazy"><div class="slide-copy"><p class="eyebrow">0${i+1} / 03</p><h3>${e.title}</h3><p class="tagline">${e.tagline}</p><p class="duration">${e.duration}</p><p class="treatments">${e.menu}</p><p class="slide-description">${e.description}</p><button class="button dark" data-book="${e.id}">${e.cta} <span aria-hidden="true">↗</span></button></div></article>`).join('');
$('#menu-items').innerHTML=experiences.map(e=>`<article class="menu-item" id="detail-${e.id}"><h3>${e.title}</h3><p>${e.duration} · ${e.menu}</p><p>${e.description}</p><button data-book="${e.id}">Chọn trải nghiệm này ↗</button></article>`).join('');
let current=0;const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;function update(){const slides=[...track.children];current=slides.reduce((best,slide,i)=>Math.abs(slide.offsetLeft-track.offsetLeft-carousel.scrollLeft)<Math.abs(slides[best].offsetLeft-track.offsetLeft-carousel.scrollLeft)?i:best,0);$('#slide-count').innerHTML=`0${current+1} <span>/ 03</span>`;$('#previous').disabled=current===0;$('#next').disabled=current===2;}function go(index){const slide=track.children[Math.max(0,Math.min(2,index))];carousel.scrollTo({left:slide.offsetLeft-track.offsetLeft,behavior:reduced?'instant':'smooth'});}$('#previous').onclick=()=>go(current-1);$('#next').onclick=()=>go(current+1);carousel.addEventListener('scroll',update,{passive:true});carousel.addEventListener('keydown',e=>{if(e.target!==carousel)return;if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();go(current+(e.key==='ArrowRight'?1:-1));}});window.addEventListener('resize',update);update();
function book(id){if(menuDialog.open)menuDialog.close();interest.value=id;$('#booking').scrollIntoView({behavior:reduced?'instant':'smooth'});interest.focus({preventScroll:true});}document.addEventListener('click',e=>{const booking=e.target.closest('[data-book]');if(booking)book(booking.dataset.book);});$('#consult').onclick=()=>book('consult');document.querySelectorAll('dialog').forEach(dialog=>{dialog.querySelector('.close').onclick=()=>dialog.close();dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});});$('#booking-open').onclick=()=>{$('#chosen').textContent='Bạn đang quan tâm: '+interest.options[interest.selectedIndex].text;bookingDialog.showModal();};

const therapy=$('.therapy-scroll');
if(therapy){
  let therapyFrame=0;
  const clamp=value=>Math.min(1,Math.max(0,value));
  const ease=value=>1-Math.pow(1-value,3);
  function updateTherapy(){
    therapyFrame=0;
    if(reduced){therapy.style.setProperty('--therapy-progress','1');return;}
    const rect=therapy.getBoundingClientRect();
    const distance=Math.max(1,therapy.offsetHeight-innerHeight);
    const progress=clamp(-rect.top/distance);
    const startSize=innerWidth<=600?Math.min(innerWidth*.82,innerHeight*.53):Math.min(innerWidth*.53,innerHeight*.67,753);
    const coverSize=Math.hypot(innerWidth,innerHeight)*1.08;
    const size=startSize+(coverSize-startSize)*ease(progress);
    const headingOpacity=clamp(1-progress*2.25);
    const introOpacity=clamp((progress-.08)*4.5);
    const keyword1Opacity=clamp((progress-.30)*6.25);
    const keyword2Opacity=clamp((progress-.44)*6.25);
    const keyword3Opacity=clamp((progress-.58)*6.25);
    const noteOpacity=clamp(1-progress*5);
    const imageProgress=-progress*.3;
    therapy.style.setProperty('--therapy-progress',progress.toFixed(4));
    therapy.style.setProperty('--therapy-size',`${size.toFixed(1)}px`);
    therapy.style.setProperty('--therapy-image-height',`${(coverSize*1.08).toFixed(1)}px`);
    therapy.style.setProperty('--therapy-image-y',`${(-imageProgress*8).toFixed(3)}%`);
    therapy.style.setProperty('--therapy-heading-opacity',headingOpacity.toFixed(4));
    therapy.style.setProperty('--therapy-heading-y',`${(-34*progress).toFixed(1)}px`);
    therapy.style.setProperty('--therapy-intro-opacity',introOpacity.toFixed(4));
    therapy.style.setProperty('--therapy-intro-y',`${(14*(1-introOpacity)).toFixed(1)}px`);
    therapy.style.setProperty('--therapy-keyword-1-opacity',keyword1Opacity.toFixed(4));
    therapy.style.setProperty('--therapy-keyword-2-opacity',keyword2Opacity.toFixed(4));
    therapy.style.setProperty('--therapy-keyword-3-opacity',keyword3Opacity.toFixed(4));
    therapy.style.setProperty('--therapy-keyword-1-y',`${(12*(1-keyword1Opacity)).toFixed(1)}px`);
    therapy.style.setProperty('--therapy-keyword-2-y',`${(12*(1-keyword2Opacity)).toFixed(1)}px`);
    therapy.style.setProperty('--therapy-keyword-3-y',`${(12*(1-keyword3Opacity)).toFixed(1)}px`);
    therapy.style.setProperty('--therapy-note-opacity',noteOpacity.toFixed(4));
  }
  function requestTherapyUpdate(){if(!therapyFrame)therapyFrame=requestAnimationFrame(updateTherapy);}
  addEventListener('scroll',requestTherapyUpdate,{passive:true});
  addEventListener('resize',requestTherapyUpdate);
  updateTherapy();
}
