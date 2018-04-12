const REGISTER = "audio-player/components/register";
const UNREGISTER = "audio-player/compnents/unregister";
const ENABLE = "audio-player/components/enable";
const DISABLE = "audio-player/components/disable";

export function registerComponent(component, componentName) {
  return {
    type: REGISTER,
    payload: {
      component, 
      componentName
    }
  }
}

export function unregisterComponent(componentName) {
  return {
    type: UNREGISTER,
    payload: {
      componentName
    }
  }
}

export function enableComponent(componentName) {
  return {
    type: ENABLE,
    payload: {
      componentName
    }
  }
}

export function disableComponent(componentName) {
  return {
    type: DISABLE,
    payload: {
      componentName
    }
  }
}

function setComponentAttribute(attribute, value, identifier) {
  return function(component) {
    if (component.name !== identifier) return component;
    return {
      ...component,
      [attribute]: value
    }
  }
}

export default function componentReducer(state=[], action) {
  switch (action.type) {
    case REGISTER:
      return [
        ...state,
        {
          component: action.payload.component,
          name: action.payload.componentName,
          enabled: true
        }
      ]

    case UNREGISTER:
      return state.filter(({ name }) => name !== action.payload.componentName)
    
    case ENABLE:
      return state.filter(setComponentAttribute("enabled", true, action.payload.name))

    case DISABLE:
      return state.filter(setComponentAttribute("enabled", false, action.payload.name))

    default:
      return state;
  }
}