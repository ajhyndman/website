// @flow

export type Action = {
  type: string;
  body?: any;
};

export type Command = {
  type: string;
  body?: any;
};

export type Model<shape: Object> = shape;

export type Init<shape> = [Model<shape>, Command];

export type Update<shape> = (action: Action, model: Model<shape>) => [Model<shape>, Command];

export type View<shape> = (model: Model<shape>, dispatch: (action: Action) => void) => *;

export type Subscription = (command: Command, dispatch: (action: Action) => void) => void;

export type ProgramDefinition<shape> = {
  init: Init<shape>;
  mount: (virtualElement: *) => void;
  update: Update<shape>;
  subscriptions: Subscription[];
  view: View<shape>;
};

function program<shape: Object> ({
  init,
  mount,
  subscriptions,
  update,
  view
}: ProgramDefinition<shape>) {
  const [firstState, firstCommand] = init;

  const dispatch = (action: Action) => {
    program({
      init: update(action, firstState),
      mount,
      subscriptions,
      update,
      view
    });
  };

  subscriptions.forEach(
    (subscription) => { subscription(firstCommand, dispatch); }
  );

  const virtualElement = view(firstState, dispatch);

  mount(virtualElement);
}

export default program;
