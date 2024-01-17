
// Copyright CESSDA ERIC 2017-2024
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



import { Dispatch as ReduxDispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { Action } from "./actions";
import { rootReducer } from "./reducers";

export type State = ReturnType<typeof rootReducer>;

export type Dispatch = ReduxDispatch<Action>;

export type Thunk<Return=void, ExtraArgument=undefined> = ThunkAction<Return, State, ExtraArgument, Action>;
