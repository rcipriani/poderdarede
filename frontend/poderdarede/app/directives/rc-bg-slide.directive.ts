import {Directive, ElementRef, Input} from '@angular/core';

@Directive({
    selector: '[usiBgSlide]',
    host: {
        '(mouseenter)': 'onMouseEnter()',
        '(mouseleave)': 'onMouseLeave()',
        '[class.fade]': '_fade'
    }
})
export class UsiBgSlideDirective {

    private _el: HTMLElement;
    private _imgs: string[] = [];
    private _initImg: number = 0;
    private _numberImgs: number = 0;
    public _fade: boolean = false;


    @Input() set imgs(imgs: string[]) {
        this._imgs = imgs || this._imgs;
    }

    constructor(el: ElementRef) {
        this._el = el.nativeElement;
    }

    ngAfterViewInit() {
        this._inicarSlide();
    }

    onMouseEnter() {
        console.log("Pausar");
        this._fade = true;
    }

    onMouseLeave() {
        console.log("Dar play");
        this._fade = false;
    }

    private _inicarSlide() {

        this._numberImgs = this._imgs.length;

        setInterval(() => {
            setTimeout(function(){
                console.log("set time out");
                this._fade = true;
            
            }, 500);
            
            this._slide();

        }, 3000);

    }

    private _slide() {
        
        
        
        this._fade = false;

        this._el.style.background = "url(" + this._imgs[this._initImg] + ")";

        if (this._initImg >= this._numberImgs - 1) {
            this._initImg = 0;
        } else {
            this._initImg++;
        }
    }
}