
/*
We import js-son and assign Belief, Plan, Agent, and Environment to sepearate consts for the sake of
convenience:
*/
const { Belief, Plan, Agent, Environment } = require('js-son-agent')
/*
Beliefs: Beliefs specify what the agent beliefs about the state of its environment, 
as well as about is own state. Each belief has a unique ID.

Context Information:
light presented
human presented
*/
const beliefs = {

  //avatar agnet
  //...Belief('context', {LightPresented:true, HumanPresented:true}),
  //...Belief('plantAvatar', {size:"big", material:"happy", animation:"happy"}),
  ...Belief('human', {presented:true}),
  ...Belief('light', {presented:true})

  //...Belief('door',  { locked: true }),
  //...Belief('requests', [])

}

/*
First, we define the plant agent.
The plant has the following plans:

1. If it believe the human is presented, it is size will be big

2. If it dose not believe the human is presented, it is size will be small
*/

const plantPlantAvatar = [
    Plan(
     beliefs => beliefs.human.presented == true,
     () => [{plantSize: "big"}]
    	),
     Plan(
     beliefs => beliefs.human.presented == false,
     () => [{plantSize: "small"}]
     	)
]

const plantAvatar = new Agent("plantAvatar" ,beliefs, {}, plantPlantAvatar)
/*
Now, as we have the agents defined, we need to specify the environment.
First, we set the environments state, which is--in our case--consistent with the agents' beliefs:
*/
const state = {
	/*
  context: {LightPresented:true, HumanPresented:true},
  door: { locked: true },
  requests: []
  */

  human: {presented:false},
  light: {presented:true}
}

/*
To define how the environment processes agent actions, we implement the ``updateState`` function.
The function takes an agent's actions, as well as the agent ID and the current state to determine
the environment's state update that is merged into the new state
``state = { ...state, ...stateUpdate }``.
*/
const updateState = (actions, agentId, currentState) => {
  const stateUpdate = {
    requests: currentState.requests
  }
  //human present 
  actions.forEach(action => {
    if (action.some(action => action.plantSize == 'big')) {
      //stateUpdate.door = { locked: true }
      //stateUpdate.requests = []
      //mqtt sent to Unity
      console.log(`${agentId}: big`)
    }

    if (action.some(action => action.plantSize == 'small')) {
      //stateUpdate.door = { locked: true }
      //stateUpdate.requests = []
      console.log(`${agentId}: small`)

      //console.log(humanMessage)
    }


   
  })
  return stateUpdate
}

/*
To simulate a partially observable world, we can specify the environment's ``stateFilter`` function,
which determines how the state update should be shared with the agents.
However, in our case we simply communicate the whole state update to all agents,
which is also the default behavior of the environment, if no ``stateFilter`` function is specified.
*/
const stateFilter = state => state

/* We instantiate the environment with the specified agents, state, update function, and filter
function:
*/
const environment = new Environment(
  [plantAvatar],
  state,
  updateState,
  stateFilter
)

// Finally, we run 20 iterations of the scenario:
environment.run()
