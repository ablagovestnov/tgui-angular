import { 
  Component, 
  ViewEncapsulation, 
  ChangeDetectionStrategy,
  input, 
  computed
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'tgui-ios-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-container [ngSwitch]="size()">
      <svg  *ngSwitchCase="'l'" id="l151:1947" width="44" height="44" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg">
        <g transform="matrix(1,0,0,1,0,0)">
          <g id="l151:1947" opacity="1" style='normal'>
            <g>
              <defs>
                <clipPath id="l151:1947_clipPath" x="-50%" y="-50%" width="200%" height="200%">
                  <path d="M0,0h44v0v44v0h-44v0v-44z" fill="white" clipRule="nonzero" />
                </clipPath>
              </defs>
              <g clipPath="url(#l151:1947_clipPath)">
                <g
                  transform="matrix(-0.7071067811865475,-0.7071067811865476,0.7071067811865476,-0.7071067811865475,9.2715,37.5564)">
                  <g id="l151:1985" opacity="0.837" style='normal'>
                    <g>
                      <g>
                        <path id="l151:1985_fill_path"
                          d="M2,0v0c1.10457,0 2,0.89543 2,2v10c0,1.10457 -0.89543,2 -2,2v0c-1.10457,0 -2,-0.89543 -2,-2v-10c0,-1.10457 0.89543,-2 2,-2z"
                          fillRule="nonzero" fill="currentColor" fillOpacity="1"
                          style='normal'
                        />
                      </g>
                    </g>
                  </g>
                </g>
                <g transform="matrix(1,0,0,1,20,29)">
                  <g id="l151:1980" opacity="0.467" style='normal'>
                    <g>
                      <g>
                        <path id="l151:1980_fill_path"
                          d="M2,0v0c1.10457,0 2,0.89543 2,2v9c0,1.10457 -0.89543,2 -2,2v0c-1.10457,0 -2,-0.89543 -2,-2v-9c0,-1.10457 0.89543,-2 2,-2z"
                          fillRule="nonzero" fill="currentColor" fillOpacity="1"
                          style='normal' />
                      </g>
                    </g>
                  </g>
                </g>
                <g
                  transform="matrix(0.7071067811865476,-0.7071067811865475,0.7071067811865475,0.7071067811865476,24.8291,27.6569)">
                  <g id="l151:1982" opacity="0.153" style='normal'>
                    <g>
                      <g>
                        <path id="l151:1982_fill_path"
                          d="M2,0v0c1.10457,0 2,0.89543 2,2v10c0,1.10457 -0.89543,2 -2,2v0c-1.10457,0 -2,-0.89543 -2,-2v-10c0,-1.10457 0.89543,-2 2,-2z"
                          fillRule="nonzero" fill="currentColor" fillOpacity="1"
                          style='normal' />
                      </g>
                    </g>
                  </g>
                </g>
                <g transform="matrix(6.123233995736766e-17,-1,1,6.123233995736766e-17,29,24)">
                  <g id="l151:1984" opacity="0.049" style='normal'>
                    <g>
                      <g>
                        <path id="l151:1984_fill_path"
                          d="M2,0v0c1.10457,0 2,0.89543 2,2v9c0,1.10457 -0.89543,2 -2,2v0c-1.10457,0 -2,-0.89543 -2,-2v-9c0,-1.10457 0.89543,-2 2,-2z"
                          fillRule="nonzero" fill="currentColor" fillOpacity="1"
                          style='normal' />
                      </g>
                    </g>
                  </g>
                </g>
                <g
                  transform="matrix(-0.7071067811865475,-0.7071067811865476,0.7071067811865476,-0.7071067811865475,27.6592,19.1716)">
                  <g id="l151:1986" opacity="0.01" style='normal'>
                    <g>
                      <g>
                        <path id="l151:1986_fill_path"
                          d="M2,0v0c1.10457,0 2,0.89543 2,2v10c0,1.10457 -0.89543,2 -2,2v0c-1.10457,0 -2,-0.89543 -2,-2v-10c0,-1.10457 0.89543,-2 2,-2z"
                          fillRule="nonzero" fill="currentColor" fillOpacity="1"
                          style='normal' />
                      </g>
                    </g>
                  </g>
                </g>
                <g transform="matrix(1,0,0,1,20,2)">
                  <g id="l151:1979" opacity="0" style='normal'>
                    <g>
                      <g>
                        <path id="l151:1979_fill_path"
                          d="M2,0v0c1.10457,0 2,0.89543 2,2v9c0,1.10457 -0.89543,2 -2,2v0c-1.10457,0 -2,-0.89543 -2,-2v-9c0,-1.10457 0.89543,-2 2,-2z"
                          fillRule="nonzero" fill="currentColor" fillOpacity="1"
                          style='normal' />
                      </g>
                    </g>
                  </g>
                </g>
                <g
                  transform="matrix(0.7071067811865476,-0.7071067811865475,0.7071067811865475,0.7071067811865476,6.4473,9.2721)">
                  <g id="l151:1981" opacity="0" style='normal'>
                    <g>
                      <g>
                        <path id="l151:1981_fill_path"
                          d="M2,0v0c1.10457,0 2,0.89543 2,2v10c0,1.10457 -0.89543,2 -2,2v0c-1.10457,0 -2,-0.89543 -2,-2v-10c0,-1.10457 0.89543,-2 2,-2z"
                          fillRule="nonzero" fill="currentColor" fillOpacity="1"
                          style='normal' />
                      </g>
                    </g>
                  </g>
                </g>
                <g transform="matrix(6.123233995736766e-17,-1,1,6.123233995736766e-17,2,24)">
                  <g id="l151:1983" opacity="1" style='normal'>
                    <g>
                      <g>
                        <path id="l151:1983_fill_path"
                          d="M2,0v0c1.10457,0 2,0.89543 2,2v9c0,1.10457 -0.89543,2 -2,2v0c-1.10457,0 -2,-0.89543 -2,-2v-9c0,-1.10457 0.89543,-2 2,-2z"
                          fillRule="nonzero" fill="currentColor" fillOpacity="1"
                          style='normal' />
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
        <animate href="#l151:1985" attributeName="opacity" values="0.837;0;1;0.8366;0;0" dur="0.8s" repeatCount="indefinite"
          calcMode="spline" keyTimes="0;0.75;0.87;1;1;1"
          keySplines="0.5 0.35 0.15 1;0.5 0.35 0.15 1;0.5 0.35 0.15 1;0.5 0.35 0.15 1;0.5 0.35 0.15 1"
          additive="replace" fill="freeze" />
        <animate href="#l151:1980" attributeName="opacity" values="0.467;0;1;0.4669;0;0" dur="0.8s" repeatCount="indefinite"
          calcMode="spline" keyTimes="0;0.63;0.75;1;1;1"
          keySplines="0.5 0.35 0.15 1;0.5 0.35 0.15 1;0.5 0.35 0.15 1;0.5 0.35 0.15 1;0.5 0.35 0.15 1"
          additive="replace" fill="freeze" />
        <animate href="#l151:1982" attributeName="opacity" values="0.153;0.05;1;0.1534;0;0" dur="0.8s"
          repeatCount="indefinite" calcMode="spline" keyTimes="0;0.5;0.63;1;1;1"
          keySplines="0.5 0.35 0.15 1;0.5 0.35 0.15 1;0.5 0.35 0.15 1;0.5 0.35 0.15 1;0.5 0.35 0.15 1"
          additive="replace" fill="freeze" />
        <animate href="#l151:1984" attributeName="opacity" values="0.049;0;1;0.0493;0;0" dur="0.8s" repeatCount="indefinite"
          calcMode="spline" keyTimes="0;0.37;0.5;1;1;1"
          keySplines="0.5 0.35 0.15 1;0.5 0.35 0.15 1;0.5 0.35 0.15 1;0.5 0.35 0.15 1;0.5 0.35 0.15 1"
          additive="replace" fill="freeze" />
        <animate href="#l151:1986" attributeName="opacity" values="0.01;0;1;0.0099;0;0" dur="0.8s" repeatCount="indefinite"
          calcMode="spline" keyTimes="0;0.25;0.37;1;1;1"
          keySplines="0.5 0.35 0.15 1;0.5 0.35 0.15 1;0.5 0.35 0.15 1;0.5 0.35 0.15 1;0.5 0.35 0.15 1"
          additive="replace" fill="freeze" />
        <animate href="#l151:1979" attributeName="opacity" values="0;0;1;0" dur="0.8s" repeatCount="indefinite"
          calcMode="spline" keyTimes="0;0.13;0.25;1" keySplines="0.5 0.35 0.15 1;0.5 0.35 0.15 1;0.5 0.35 0.15 1"
          additive="replace" fill="freeze" />
        <animate href="#l151:1981" attributeName="opacity" values="0;1;0;0" dur="0.8s" repeatCount="indefinite"
          calcMode="spline" keyTimes="0;0.13;0.89;1" keySplines="0.5 0.35 0.15 1;0.5 0.35 0.15 1;0.5 0.35 0.15 1"
          additive="replace" fill="freeze" />
        <animate href="#l151:1983" attributeName="opacity" values="1;0;1" dur="0.8s" repeatCount="indefinite"
          calcMode="spline" keyTimes="0;0.89;1" keySplines="0.5 0.35 0.15 1;0.5 0.35 0.15 1" additive="replace"
          fill="freeze" />
      </svg>
      <svg *ngSwitchCase="'m'" xmlns="http://www.w3.org/2000/svg" id="m151:1947" width="32" height="32" viewBox="0 0 32 32">
  <g transform="matrix(1,0,0,1,0,0)">
    <g id="m151:1947" opacity="1" style='normal'>
      <g>
        <defs>
          <clipPath id="m151:1947_clipPath" x="-50%" y="-50%" width="200%" height="200%">
            <path d="M0,0h32v0v32v0h-32v0v-32z" fill="white" clipRule="nonzero" />
          </clipPath>
        </defs>
        <g clipPath="url(#151:1947_clipPath)">
          <g
            transform="matrix(-0.7071067811865475,-0.7071067811865476,0.7071067811865476,-0.7071067811865475,6.7429,27.3137)">
            <g id="m151:1985" opacity="0.837" style='normal'>
              <g>
                <g>
                  <path id="m151:1985_fill_path"
                    d="M1.5,0v0c0.82843,0 1.5,0.67157 1.5,1.5v7.1818c0,0.82843 -0.67157,1.5 -1.5,1.5v0c-0.82843,0 -1.5,-0.67157 -1.5,-1.5v-7.1818c0,-0.82843 0.67157,-1.5 1.5,-1.5z"
                    fillRule="nonzero" fill="currentColor" fillOpacity="1" style='normal' />
                </g>
              </g>
            </g>
          </g>
          <g transform="matrix(1,0,0,1,14.5454,21.0909)">
            <g id="m151:1980" opacity="0.467" style='normal'>
              <g>
                <g>
                  <path id="m151:1980_fill_path"
                    d="M1.5,0v0c0.82843,0 1.5,0.67157 1.5,1.5v6.4545c0,0.82843 -0.67157,1.5 -1.5,1.5v0c-0.82843,0 -1.5,-0.67157 -1.5,-1.5v-6.4545c0,-0.82843 0.67157,-1.5 1.5,-1.5z"
                    fillRule="nonzero" fill="currentColor" fillOpacity="1" style='normal' />
                </g>
              </g>
            </g>
          </g>
          <g
            transform="matrix(0.7071067811865476,-0.7071067811865475,0.7071067811865475,0.7071067811865476,18.0575,20.1141)">
            <g id="m151:1982" opacity="0.153" style='normal'>
              <g>
                <g>
                  <path id="m151:1982_fill_path"
                    d="M1.5,0v0c0.82843,0 1.5,0.67157 1.5,1.5v7.1818c0,0.82843 -0.67157,1.5 -1.5,1.5v0c-0.82843,0 -1.5,-0.67157 -1.5,-1.5v-7.1818c0,-0.82843 0.67157,-1.5 1.5,-1.5z"
                    fillRule="nonzero" fill="currentColor" fillOpacity="1" style='normal' />
                </g>
              </g>
            </g>
          </g>
          <g transform="matrix(6.123233995736766e-17,-1,1,6.123233995736766e-17,21.0909,17.4545)">
            <g id="m151:1984" opacity="0.049" style='normal'>
              <g>
                <g>
                  <path id="m151:1984_fill_path"
                    d="M1.5,0v0c0.82843,0 1.5,0.67157 1.5,1.5v6.4545c0,0.82843 -0.67157,1.5 -1.5,1.5v0c-0.82843,0 -1.5,-0.67157 -1.5,-1.5v-6.4545c0,-0.82843 0.67157,-1.5 1.5,-1.5z"
                    fillRule="nonzero" fill="currentColor" fillOpacity="1" style='normal' />
                </g>
              </g>
            </g>
          </g>
          <g
            transform="matrix(-0.7071067811865475,-0.7071067811865476,0.7071067811865476,-0.7071067811865475,20.1157,13.943)">
            <g id="m151:1986" opacity="0.01" style='normal'>
              <g>
                <g>
                  <path id="m151:1986_fill_path"
                    d="M1.5,0v0c0.82843,0 1.5,0.67157 1.5,1.5v7.1818c0,0.82843 -0.67157,1.5 -1.5,1.5v0c-0.82843,0 -1.5,-0.67157 -1.5,-1.5v-7.1818c0,-0.82843 0.67157,-1.5 1.5,-1.5z"
                    fillRule="nonzero" fill="currentColor" fillOpacity="1" style='normal' />
                </g>
              </g>
            </g>
          </g>
          <g transform="matrix(1,0,0,1,14.5454,1.4545)">
            <g id="m151:1979" opacity="0" style='normal'>
              <g>
                <g>
                  <path id="m151:1979_fill_path"
                    d="M1.5,0v0c0.82843,0 1.5,0.67157 1.5,1.5v6.4545c0,0.82843 -0.67157,1.5 -1.5,1.5v0c-0.82843,0 -1.5,-0.67157 -1.5,-1.5v-6.4545c0,-0.82843 0.67157,-1.5 1.5,-1.5z"
                    fillRule="nonzero" fill="currentColor" fillOpacity="1" style='normal' />
                </g>
              </g>
            </g>
          </g>
          <g
            transform="matrix(0.7071067811865476,-0.7071067811865475,0.7071067811865475,0.7071067811865476,4.6889,6.7433)">
            <g id="m151:1981" opacity="0" style='normal'>
              <g>
                <g>
                  <path id="m151:1981_fill_path"
                    d="M1.5,0v0c0.82843,0 1.5,0.67157 1.5,1.5v7.1818c0,0.82843 -0.67157,1.5 -1.5,1.5v0c-0.82843,0 -1.5,-0.67157 -1.5,-1.5v-7.1818c0,-0.82843 0.67157,-1.5 1.5,-1.5z"
                    fillRule="nonzero" fill="currentColor" fillOpacity="1" style='normal' />
                </g>
              </g>
            </g>
          </g>
          <g transform="matrix(6.123233995736766e-17,-1,1,6.123233995736766e-17,1.4545,17.4545)">
            <g id="m151:1983" opacity="1" style='normal'>
              <g>
                <g>
                  <path id="m151:1983_fill_path"
                    d="M1.5,0v0c0.82843,0 1.5,0.67157 1.5,1.5v6.4545c0,0.82843 -0.67157,1.5 -1.5,1.5v0c-0.82843,0 -1.5,-0.67157 -1.5,-1.5v-6.4545c0,-0.82843 0.67157,-1.5 1.5,-1.5z"
                    fillRule="nonzero" fill="currentColor" fillOpacity="1" style='normal' />
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </g>
  </g>
  <animate href="#m151:1985" attributeName="opacity" values="0.837;0;1;0.8366;0;0" dur="0.8s" repeatCount="indefinite"
    calcMode="spline" keyTimes="0;0.75;0.87;1;1;1"
    keySplines="0.5 0.35 0.15 1;0.5 0.35 0.15 1;0.5 0.35 0.15 1;0.5 0.35 0.15 1;0.5 0.35 0.15 1"
    additive="replace" fill="freeze" />
  <animate href="#m151:1980" attributeName="opacity" values="0.467;0;1;0.4669;0;0" dur="0.8s" repeatCount="indefinite"
    calcMode="spline" keyTimes="0;0.63;0.75;1;1;1"
    keySplines="0.5 0.35 0.15 1;0.5 0.35 0.15 1;0.5 0.35 0.15 1;0.5 0.35 0.15 1;0.5 0.35 0.15 1"
    additive="replace" fill="freeze" />
  <animate href="#m151:1982" attributeName="opacity" values="0.153;0.05;1;0.1534;0;0" dur="0.8s"
    repeatCount="indefinite" calcMode="spline" keyTimes="0;0.5;0.63;1;1;1"
    keySplines="0.5 0.35 0.15 1;0.5 0.35 0.15 1;0.5 0.35 0.15 1;0.5 0.35 0.15 1;0.5 0.35 0.15 1"
    additive="replace" fill="freeze" />
  <animate href="#m151:1984" attributeName="opacity" values="0.049;0;1;0.0493;0;0" dur="0.8s" repeatCount="indefinite"
    calcMode="spline" keyTimes="0;0.37;0.5;1;1;1"
    keySplines="0.5 0.35 0.15 1;0.5 0.35 0.15 1;0.5 0.35 0.15 1;0.5 0.35 0.15 1;0.5 0.35 0.15 1"
    additive="replace" fill="freeze" />
  <animate href="#m151:1986" attributeName="opacity" values="0.01;0;1;0.0099;0;0" dur="0.8s" repeatCount="indefinite"
    calcMode="spline" keyTimes="0;0.25;0.37;1;1;1"
    keySplines="0.5 0.35 0.15 1;0.5 0.35 0.15 1;0.5 0.35 0.15 1;0.5 0.35 0.15 1;0.5 0.35 0.15 1"
    additive="replace" fill="freeze" />
  <animate href="#m151:1979" attributeName="opacity" values="0;0;1;0" dur="0.8s" repeatCount="indefinite"
    calcMode="spline" keyTimes="0;0.13;0.25;1" keySplines="0.5 0.35 0.15 1;0.5 0.35 0.15 1;0.5 0.35 0.15 1"
    additive="replace" fill="freeze" />
  <animate href="#m151:1981" attributeName="opacity" values="0;1;0;0" dur="0.8s" repeatCount="indefinite"
    calcMode="spline" keyTimes="0;0.13;0.89;1" keySplines="0.5 0.35 0.15 1;0.5 0.35 0.15 1;0.5 0.35 0.15 1"
    additive="replace" fill="freeze" />
  <animate href="#m151:1983" attributeName="opacity" values="1;0;1" dur="0.8s" repeatCount="indefinite"
    calcMode="spline" keyTimes="0;0.89;1" keySplines="0.5 0.35 0.15 1;0.5 0.35 0.15 1" additive="replace"
    fill="freeze" />
      </svg>
      <svg *ngSwitchCase="'s'" id="s151:1947" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <g transform="matrix(1,0,0,1,0,0)">
          <g id="s151:1947" opacity="1" style='normal'>
            <g>
              <defs>
                <clipPath id="s151:1947_clipPath" x="-50%" y="-50%" width="200%" height="200%">
                  <path d="M0,0h24v0v24v0h-24v0v-24z" fill="white" clipRule="nonzero" />
                </clipPath>
              </defs>
              <g clipPath="url(#151:1947_clipPath)">
                <g
                  transform="matrix(-0.7071067811865475,-0.7071067811865476,0.7071067811865476,-0.7071067811865475,5.64,19.78)">
                  <g id="s151:1985" opacity="0.837" style='normal'>
                    <g>
                      <g>
                        <path id="s151:1985_fill_path"
                          d="M1,0v0c0.55228,0 1,0.44772 1,1v5c0,0.55228 -0.44772,1 -1,1v0c-0.55228,0 -1,-0.44772 -1,-1v-5c0,-0.55228 0.44772,-1 1,-1z"
                          fillRule="nonzero" fill="currentColor" fillOpacity="1"
                          style='normal' />
                      </g>
                    </g>
                  </g>
                </g>
                <g transform="matrix(1,0,0,1,11,15)">
                  <g id="s151:1980" opacity="0.467" style='normal'>
                    <g>
                      <g>
                        <path id="s151:1980_fill_path"
                          d="M1,0v0c0.55228,0 1,0.44772 1,1v5c0,0.55228 -0.44772,1 -1,1v0c-0.55228,0 -1,-0.44772 -1,-1v-5c0,-0.55228 0.44772,-1 1,-1z"
                          fillRule="nonzero" fill="currentColor" fillOpacity="1"
                          style='normal' />
                      </g>
                    </g>
                  </g>
                </g>
                <g
                  transform="matrix(0.7071067811865476,-0.7071067811865475,0.7071067811865475,0.7071067811865476,13.41,14.83)">
                  <g id="s151:1982" opacity="0.153" style='normal'>
                    <g>
                      <g>
                        <path id="s151:1982_fill_path"
                          d="M1,0v0c0.55228,0 1,0.44772 1,1v5c0,0.55228 -0.44772,1 -1,1v0c-0.55228,0 -1,-0.44772 -1,-1v-5c0,-0.55228 0.44772,-1 1,-1z"
                          fillRule="nonzero" fill="currentColor" fillOpacity="1"
                          style='normal' />
                      </g>
                    </g>
                  </g>
                </g>
                <g transform="matrix(6.123233995736766e-17,-1,1,6.123233995736766e-17,15,13)">
                  <g id="s151:1984" opacity="0.049" style='normal'>
                    <g>
                      <g>
                        <path id="s151:1984_fill_path"
                          d="M1,0v0c0.55228,0 1,0.44772 1,1v5c0,0.55228 -0.44772,1 -1,1v0c-0.55228,0 -1,-0.44772 -1,-1v-5c0,-0.55228 0.44772,-1 1,-1z"
                          fillRule="nonzero" fill="currentColor" fillOpacity="1"
                          style='normal' />
                      </g>
                    </g>
                  </g>
                </g>
                <g transform="matrix(1,0,0,1,13.41,4.22)">
                  <g id="s597:11660" opacity="0" style='normal'>
                    <g>
                      <g>
                        <path id="s597:11660_fill_path"
                          d="M2.0341,6.01101c-0.46533,0.46533 -1.21977,0.46533 -1.6851,0c-0.46533,-0.46533 -0.46533,-1.21977 0,-1.6851l3.97691,-3.97691c0.46533,-0.46533 1.21977,-0.46533 1.6851,0c0.46533,0.46533 0.46533,1.21977 0,1.6851z"
                          fillRule="nonzero" fill="currentColor" fillOpacity="1"
                          style='normal' />
                      </g>
                    </g>
                  </g>
                </g>
                <g transform="matrix(1,0,0,1,11,1.9998)">
                  <g id="s151:1979" opacity="0" style='normal'>
                    <g>
                      <g>
                        <path id="s151:1979_fill_path"
                          d="M1,0v0c0.55228,0 1,0.44772 1,1v5c0,0.55228 -0.44772,1 -1,1v0c-0.55228,0 -1,-0.44772 -1,-1v-5c0,-0.55228 0.44772,-1 1,-1z"
                          fillRule="nonzero" fill="currentColor" fillOpacity="1"
                          style='normal' />
                      </g>
                    </g>
                  </g>
                </g>
                <g
                  transform="matrix(0.7071067811865476,-0.7071067811865475,0.7071067811865475,0.7071067811865476,4.22,5.64)">
                  <g id="s151:1981" opacity="0" style='normal'>
                    <g>
                      <g>
                        <path id="s151:1981_fill_path"
                          d="M1,0v0c0.55228,0 1,0.44772 1,1v5c0,0.55228 -0.44772,1 -1,1v0c-0.55228,0 -1,-0.44772 -1,-1v-5c0,-0.55228 0.44772,-1 1,-1z"
                          fillRule="nonzero" fill="currentColor" fillOpacity="1"
                          style='normal' />
                      </g>
                    </g>
                  </g>
                </g>
                <g transform="matrix(6.123233995736766e-17,-1,1,6.123233995736766e-17,2.0003,13)">
                  <g id="s151:1983" opacity="1" style='normal'>
                    <g>
                      <g>
                        <path id="s151:1983_fill_path"
                          d="M1,0v0c0.55228,0 1,0.44772 1,1v5c0,0.55228 -0.44772,1 -1,1v0c-0.55228,0 -1,-0.44772 -1,-1v-5c0,-0.55228 0.44772,-1 1,-1z"
                          fillRule="nonzero" fill="currentColor" fillOpacity="1"
                          style='normal' />
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
        <animate href="#s151:1985" attributeName="opacity" values="0.837;0;1;0.8366;0;0" dur="0.8s" repeatCount="indefinite"
          calcMode="spline" keyTimes="0;0.75;0.87;1;1;1"
          keySplines="0.5 0.35 0.15 1;0.5 0.35 0.15 1;0.5 0.35 0.15 1;0.5 0.35 0.15 1;0.5 0.35 0.15 1"
          additive="replace" fill="freeze" />
        <animate href="#s151:1980" attributeName="opacity" values="0.467;0;1;0.4669;0;0" dur="0.8s" repeatCount="indefinite"
          calcMode="spline" keyTimes="0;0.63;0.75;1;1;1"
          keySplines="0.5 0.35 0.15 1;0.5 0.35 0.15 1;0.5 0.35 0.15 1;0.5 0.35 0.15 1;0.5 0.35 0.15 1"
          additive="replace" fill="freeze" />
        <animate href="#s151:1982" attributeName="opacity" values="0.153;0.05;1;0.1534;0;0" dur="0.8s"
          repeatCount="indefinite" calcMode="spline" keyTimes="0;0.5;0.63;1;1;1"
          keySplines="0.5 0.35 0.15 1;0.5 0.35 0.15 1;0.5 0.35 0.15 1;0.5 0.35 0.15 1;0.5 0.35 0.15 1"
          additive="replace" fill="freeze" />
        <animate href="#s151:1984" attributeName="opacity" values="0.049;0;1;0.0493;0;0" dur="0.8s" repeatCount="indefinite"
          calcMode="spline" keyTimes="0;0.37;0.5;1;1;1"
          keySplines="0.5 0.35 0.15 1;0.5 0.35 0.15 1;0.5 0.35 0.15 1;0.5 0.35 0.15 1;0.5 0.35 0.15 1"
          additive="replace" fill="freeze" />
        <animate href="#s597:11660" attributeName="opacity" values="0;0;1;0" dur="0.8s" repeatCount="indefinite"
          calcMode="spline" keyTimes="0;0.25;0.37;1" keySplines="0.5 0.35 0.15 1;0.5 0.35 0.15 1;0.5 0.35 0.15 1"
          additive="replace" fill="freeze" />
        <animate href="#s151:1979" attributeName="opacity" values="0;0;1;0" dur="0.8s" repeatCount="indefinite"
          calcMode="spline" keyTimes="0;0.13;0.25;1" keySplines="0.5 0.35 0.15 1;0.5 0.35 0.15 1;0.5 0.35 0.15 1"
          additive="replace" fill="freeze" />
        <animate href="#s151:1981" attributeName="opacity" values="0;1;0;0" dur="0.8s" repeatCount="indefinite"
          calcMode="spline" keyTimes="0;0.13;0.89;1" keySplines="0.5 0.35 0.15 1;0.5 0.35 0.15 1;0.5 0.35 0.15 1"
          additive="replace" fill="freeze" />
        <animate href="#s151:1983" attributeName="opacity" values="1;0;1" dur="0.8s" repeatCount="indefinite"
          calcMode="spline" keyTimes="0;0.89;1" keySplines="0.5 0.35 0.15 1;0.5 0.35 0.15 1" additive="replace"
          fill="freeze" />
      </svg>
    </ng-container>
  `,
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IOSSpinnerComponent {
  size = input<'s' | 'm' | 'l'>('s');
} 