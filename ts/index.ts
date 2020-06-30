import {BrowserJsPlumbDefaults, BrowserJsPlumbInstance} from "./dom/browser-jsplumb-instance";
import {extend} from "./core";

import {_node, _attr, _pos} from "./svg/svg-util";
import {jsPlumbHelperFunctions} from "./defaults";
import {EventManager} from "./dom/event-manager";
import {uuid} from "./util";

export * from "./constants";
export * from "./core";
export * from "./defaults";
export * from "./event-generator";

export * from "./group/group";
export * from "./group/group-manager";

export * from "./component/component";
export * from "./component/overlay-capable-component";

export * from "./geom";
export * from "./bezier";

export * from "./connector/abstract-bezier-connector";
export * from "./connector/abstract-connector";
export * from "./connector/abstract-segment";
export * from "./connector/arc-segment";
export * from "./connector/bezier-connector";
export * from "./connector/bezier-segment";
export * from "./connector/connection-impl";
export * from "./connector/connectors";
export * from "./connector/flowchart-connector";
export * from "./connector/statemachine-connector";
export * from "./connector/straight-connector";
export * from "./connector/straight-segment";

export * from "./endpoint/endpoint-impl";
export * from "./endpoint/endpoints";
export * from "./endpoint/dot-endpoint";
export * from "./endpoint/rectangle-endpoint";
export * from "./endpoint/blank-endpoint";

export * from "./overlay/overlay";
export * from "./overlay/label-overlay";
export * from "./overlay/arrow-overlay";
export * from "./overlay/plain-arrow-overlay";
export * from "./overlay/diamond-overlay";
export * from "./overlay/custom-overlay";
export * from "./factory/overlay-factory";

export * from "./anchor/anchor";
export * from "./anchor/dynamic-anchor";
export * from "./anchor/continuous-anchor";
export * from "./factory/anchor-factory";
export * from "./anchor-manager";

export * from "./connection";

export * from "./endpoint/endpoint";
export * from "./factory/endpoint-factory";

export * from "./renderer";
export * from "./styles";
export * from "./util";

// -------------------- BrowserJsPlumbInstance includes ----------------------

export * from './dom/index';

// ---------------------- window stuff ----------------------------------

let _jsPlumbInstanceIndex = 0;

function getInstanceIndex ():number {
    let i = _jsPlumbInstanceIndex + 1;
    _jsPlumbInstanceIndex++;
    return i;
}

export function newInstance(defaults?:BrowserJsPlumbDefaults, helpers?:jsPlumbHelperFunctions): BrowserJsPlumbInstance {
    return new BrowserJsPlumbInstance(getInstanceIndex(), defaults, helpers);
}

export function ready(f:Function) {
    const _do = function () {
        if (/complete|loaded|interactive/.test(document.readyState) && typeof(document.body) !== "undefined" && document.body != null) {
            f();
        }
        else {
            setTimeout(_do, 9);
        }
    };

    _do();
}

export interface jsPlumbGlobal {
    newInstance(defaults?:BrowserJsPlumbDefaults, helpers?:jsPlumbHelperFunctions): BrowserJsPlumbInstance;
    ready(f:Function):void;
    extend<T>(o1:T, o2:T, keys?:string[]):T
    uuid():string;
}

/**
 *
 * Entry point.
 *
 *
 */
if(typeof window !== "undefined") {

    (<any>window).jsPlumb = {
        newInstance:newInstance,
        ready:ready,
        extend:extend,
        svg:{
            node:_node,
            attr:_attr,
            pos:_pos
        },
        uuid:uuid
    };

    (<any>window).Mottle = EventManager;

}
