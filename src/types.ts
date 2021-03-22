
// Copyright CESSDA ERIC 2017-2021
//
// Licensed under the Apache License, Version 2.0 (the "License"); you may not
// use this file except in compliance with the License.
// You may obtain a copy of the License at
// http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.



import { Dispatch as ReduxDispatch, Store as ReduxStore } from "redux";
import { Action } from "./actions";
import { rootReducer } from "./reducers";

export type State = ReturnType<typeof rootReducer>;

export type GetState = () => State;

export type Dispatch = ReduxDispatch<Action> & ThunkDispatch<Action>;

export type ThunkDispatch<A> = (arg0: (arg0: Dispatch, arg1: GetState) => Promise<void> | void) => A;

export type Thunk = (dispatch: Dispatch, getState: GetState) => Promise<void> | void;

export type Store = ReduxStore<State, Action>;
