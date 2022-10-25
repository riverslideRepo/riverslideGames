let htmlTemplate = `<header>
        <div id="nav">
            <div id="title">
                Tic Tac Toe
            </div>
            <div id="menu_icon">
                <span class="line" id="line1"></span>
                <span class="line" id="line2"></span>
                <span class="line" id="line3"></span>
            </div>
        </div>
        <div id="menu">
            
            <div id="middle">
                <slot name="menu">

                </slot>

            </div>

            <div id="bottom">
                <a href="about.html">About</a>
            </div>
        </div>
    </header>
    <section id="mainSection">
        <div id="hpd_padding"></div>
        <slot name="mainBoard"></slot>
    </section>
    <footer>
        <div id="company">Riverslide</div>
        <div id="year">2022</div>
    </footer>


<style>
:host{
    user-select: none;
    height:100vh;
    font-size: 15px;
    font-family: sans-serif;
    outline:none;
}
header{
    position: fixed;
    width:100%;
    height:40px;
    display: flex;

    color: white;
    background-color: rgb(3, 61, 95);
    background-image: linear-gradient(-10deg, rgb(0, 110, 255), rgb(3, 61, 95));
    box-shadow: rgba(0,0,0,0.4) 0 1px 3px;

    flex-direction: column;
    z-index:500;
    overflow: hidden;
    transition:height 0.3s 0.3s;

    perspective:100px;
    perspective-origin: bottom center;
}
header *{
    color: white; 
}

header #nav{
    display:flex;
    height:40px;
    flex-direction: row;
}
header>div{
    line-height:40px;
    cursor: default;
}
header #title{
    flex-grow:1;
    margin-left: 15px;
}

/*++++*/

header #menu_icon{
    flex-grow:0;
    width:40px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap:4px;

    transition:background-color 0.2s;
}


header #menu_icon .line{
    position: relative;
    top:0;
    width:60%;
    height:2px;
    background-color: rgb(255, 255, 255);
    transform-origin: center center;
    transition: transform 0.2s 0.3s, top 0.5s 0.3s, opacity 0.5s 0.3s, width 0.5s 0.3s;
}

/*++++*/

header #menu_icon:hover{
    background-color: rgba(199, 223, 255, 0.5);
}

/*===========================*/

@keyframes close_menu{
    from{
        opacity: 1;
        transform:scale(1);
    }
    to{
        opacity: 0;
        transform:scale(0.8);
    }
}

header #menu{
    height:100%;
    overflow: hidden;
    opacity:0;
    display:flex;
    flex-direction: column;

    /* transform-origin:bottom center; */
    /* transform:rotateX(90deg); */
    transform: scale(0.8);
    
    animation-name:close_menu;
    animation-duration:0.3s;

    /* transition:transform 0.3s 0.6s, opacity 0.3s; */
}

/*----*/
header.open_menu{
    height:100%;
    transition:height 0.3s;
}
header.open_menu #menu_icon #line1{
    /* background:red; */
    transform: translateY(6px) rotateZ(45deg);
    transition:transform 0.5s 0.3s;
}
header.open_menu #menu_icon #line2{
    opacity: 0;
    width: 0;
    transition:opacity 0.3s 0.2s, width 0.3s 0.1s;
}
header.open_menu #menu_icon #line3{
    transform: translateY(-6px) rotateZ(-45deg);
    transition:transform 0.5s 0.3s;
}
/*****/

@keyframes open_menu{
    from{
        opacity: 0;
        transform:scale(0.8);
        background-color:rgba(255,255,255,0.6);
    }
    40%{
        opacity: 0;
        transform:scale(0.8);
        background-color:rgba(255,255,255,0.6);
    }
    to{
        transform:scale(1);
    }
}
header.open_menu #menu{
    animation-name:open_menu;
    animation-duration:0.5s;
    transform:scale(1);
    opacity:1;
}
/*---------*/
header #menu #middle{
   height:100%;
}

header #menu #bottom{
    display:flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
}

/*--------------------
Section
*/

section#mainSection{
    display:flex;
    /* align-items: center; */
    justify-content:center;
    flex-direction: column;
    min-height:100%;
    
}
section#mainSection #hpd_padding{
    height:40px;
}
/*-------------
footer
*/

footer{
    display: flex;
    position: fixed;
    width:100%;
    bottom: 0;
    color: #999999;
    margin-bottom: 5px;
    flex-direction: row;
    justify-content: center;
}
footer #year{
    margin-left: 5px;
    border-left: 1px solid #dd006f;
    padding-left: 5px;
}

</style>
`


let boolMenu=false;


class GameBoard extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode:'open'});
        this.shadowRoot.innerHTML = htmlTemplate;
        this.isMenuOpen=false;
    }

    connectedCallback(){
        this.shadowRoot.getElementById("title").innerHTML = this.getAttribute("title") || "Game Title";
        this.shadowRoot.getElementById("menu_icon").addEventListener("click",this.showMenu.bind(this));

    }

    showMenu(){

        if(!this.isMenuOpen){
            this.shadowRoot.querySelector("header").classList.add("open_menu");
        }else{
            this.shadowRoot.querySelector("header").classList.remove("open_menu");
        }
        this.isMenuOpen=!this.isMenuOpen;    
        // alert(boolMenu);
    }

}

customElements.define('rs-gameboard',GameBoard);


