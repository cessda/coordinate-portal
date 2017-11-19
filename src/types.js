// @flow

import type {Dispatch as ReduxDispatch, Store as ReduxStore} from 'redux';
import type {Action} from './actions';
import type {Reducers} from './reducers';

type $ExtractFunctionReturn = <V>(v: (...args: any) => V) => V;

export type State = $ObjMap<Reducers, $ExtractFunctionReturn>;

export type GetState = () => State;

export type Dispatch = ReduxDispatch<Action> & ThunkDispatch<Action>;

export type ThunkDispatch<A> = ((Dispatch, GetState) => Promise<void> | void) => A;

export type Thunk = (dispatch: Dispatch, getState: GetState) => void;

export type Store = ReduxStore<State, Action>;
