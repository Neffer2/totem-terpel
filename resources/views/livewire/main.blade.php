<div style="height: 100%">
    @if ($showCodigo)
        <div class="code-scene">         
            <div id="codigo-label">
                <h1>Tu c&oacute;digo: <b>{{ $codigo }}</b></h1>
                <h3 class="px-3 text-center">Guarda tu <b>c&oacute;digo</b> y descarga tu foto escaneando el c&oacute;digo QR</h3>
            </div>
            <div id="codigo-qr" class="p-2">
                <img src="{{ asset('assets/images/qr-code.png') }}" alt="">
            </div>
            <a class="btn btn-primary" href="{{ route('/') }}" style="background-color: #6f42c1; border-color: #6f42c1">  
                <i class="fa-solid fa-rotate-left"></i>
            </a>
        </div>  
    @else  
        <div id="menu-scene" class="menu-scene">        
            <div class="top-logos">
                <img src="{{ asset('assets/images/top-logos.png') }}">
            </div>
            <div class="logos">
                <img id="play-button" src="{{ asset('assets/images/boton.png') }}">
            </div>
        </div>
        
        <div id="webcam-scene" class="webcam-scene hidden">
            <canvas id="canvas" width="640" height="480" style="display: none;"></canvas>
            <div class="top-logos-webcam">
                <img src="{{ asset('assets/images/top-logos.png') }}">
            </div>
            <div id="webar">
                <button id="snap" class="btn btn-primary camera-button"> 
                    <i class="fa-solid fa-camera"></i>
                </button>
                <video id="video" playsinline autoplay></video> 
                <img id="marco-thumb" src="{{ asset('assets/images/marco1.png') }}" style="position: absolute; width: 100%; bottom: 0%;">
            </div> 
            <div class="banner">
                <img src="{{ asset('assets/images/escoge-fondo.png') }}">
            </div>
            <div class="miniaturas">
                <img onclick="setMarco('marco1')" src="{{ asset('assets/images/thumbnail/mini1.jpg') }}">
                <img onclick="setMarco('marco2')" src="{{ asset('assets/images/thumbnail/mini2.jpg') }}">
                <img onclick="setMarco('marco3')" src="{{ asset('assets/images/thumbnail/mini3.jpg') }}">
                <img onclick="setMarco('marco4')" src="{{ asset('assets/images/thumbnail/mini4.jpg') }}">
            </div>
        </div>
    @endif
</div>
  