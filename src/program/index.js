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

class Program<shape: Object> {
  addSubscription: (subscription: Subscription) => void;
  dispatch: (action: Action) => void;
  fireCommand: (command: Command) => void;
  mount: (virtualElement: *) => void;
  state: shape;
  subscriptions: Subscription[];
  update: Update<shape>;
  view: View<shape>;

  constructor ({
    init,
    mount,
    subscriptions,
    update,
    view
  }: ProgramDefinition<shape>) {
    this.dispatch = this.dispatch.bind(this);
    this.fireCommand = this.fireCommand.bind(this);

    const [firstState, firstCommand] = init;

    this.mount = mount;
    this.state = firstState;
    this.subscriptions = subscriptions;
    this.update = update;
    this.view = view;


    this.mount(this.view(firstState, this.dispatch));

    this.fireCommand(firstCommand);
  }

  dispatch (action: Action) {
    const [nextState, nextCommand] = this.update(action, this.state);
    this.state = nextState;

    this.mount(this.view(this.state, this.dispatch));

    this.fireCommand(nextCommand);
  }

  fireCommand (command: Command) {
    this.subscriptions.forEach(
      (subscription) => { subscription(command, this.dispatch); }
    );
  }
}

export default Program;
