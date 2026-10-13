import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
const clamp = value => Math.max(0, Math.min(1, value));
const smooth = (value, start, end) => {
  const t = clamp((value - start) / (end - start));
  return t * t * (3 - 2 * t);
};
export const lensProgress = index => (index + .2) / 2.6;
export const lensFrame = progress => {
  const units = clamp(progress) * 2.6;
  const from = Math.min(2, Math.floor(units));
  const to = Math.min(2, from + 1);
  const local = units - from;
  const shift = from === to ? 0 : smooth(local, .48, 1);
  const outgoing = from === to ? 1 : 1 - smooth(local, .48, .72);
  const incoming = from === to ? 0 : smooth(local, .72, 1);
  return { from, to, shift, outgoing, incoming, active: shift < .5 ? from : to };
};
const apertures = [[12,5,12,42],[12,38,12,5],[18,5,18,29]];

/** One real environment stays present while the three model perspectives change its framing. */
export function mountLensSequence(root, scrollTo) {
  const track = root.querySelector('#stage-evidence');
  const stage = track.querySelector('.lenses-stage');
  const photo = stage.querySelector('.lens-photo');
  const scenes = [...stage.querySelectorAll('[data-lens]')];
  const buttons = [...stage.querySelectorAll('[data-lens-select]')];
  const image = photo.querySelector('img');
  const proxy = { progress:0 };
  let active = -1;
  track.classList.add('is-driven');
  const paint = () => {
    const frame = lensFrame(proxy.progress);
    const mask = apertures[frame.from].map((value,i) => value + (apertures[frame.to][i] - value) * frame.shift);
    photo.style.clipPath = `inset(${mask.map(value=>value+'%').join(' ')})`;
    image.style.transform = `translateX(${-(frame.from + frame.shift) * 2}%) scale(1.08)`;
    scenes.forEach((scene,i) => {
      const opacity = i === frame.from ? frame.outgoing : i === frame.to ? frame.incoming : 0;
      scene.style.opacity = opacity;
      scene.style.visibility = opacity > 0 ? 'visible' : 'hidden';
      scene.style.transform = opacity === 1 ? 'none' : `translateX(${i===frame.from ? -50*frame.shift : 50*(1-frame.shift)}px)`;
      scene.inert = i !== frame.active;
      scene.setAttribute('aria-hidden', String(i !== frame.active));
    });
    if(active !== frame.active) {
      active = frame.active;
      buttons.forEach((button,i)=>button.setAttribute('aria-current',String(i===active)));
    }
  };
  const animation = gsap.to(proxy,{progress:1,ease:'none',onUpdate:paint,scrollTrigger:{
    trigger:track,start:'top 88px',end:'bottom bottom',scrub:.28,invalidateOnRefresh:true,onRefresh:paint,
  }});
  paint();
  return {
    select(index) {
      const trigger = animation.scrollTrigger;
      scrollTo(trigger.start + (trigger.end-trigger.start)*lensProgress(index));
    },
    dispose() {
      animation.scrollTrigger.kill(); animation.kill();
      track.classList.remove('is-driven');
      photo.style.clipPath = ''; image.style.transform = '';
      scenes.forEach(scene=>{ scene.style.opacity='';scene.style.visibility='';scene.style.transform='';scene.inert=false;scene.removeAttribute('aria-hidden'); });
    },
  };
}
