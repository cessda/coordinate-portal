import React from "react";
import { Link } from "react-router";
import { TermVocabAttributes } from "../../common/metadata";
import { upperFirst } from "lodash";
import Translate from "react-translate-component";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { TermURIResult, getELSSTTerm } from "../actions/detail";

export interface Props {
  keywords: TermVocabAttributes[];
  lang: string;
}

interface State {
  isExpanded: boolean;
  elsstURLs: TermURIResult;
}

export class Keywords extends React.Component<Props, State> {

  private static readonly truncatedKeywordsLength = 12;

  constructor(props: Props) {
    super(props);
    this.state = {
      isExpanded: !(props.keywords.length > Keywords.truncatedKeywordsLength),
      elsstURLs: {}
    };
  }

  componentDidMount(): void {
    this.getELSSTURLs(this.props.keywords);
  }

  private generateElements<T> (
    field: T[],
    callback: (args: T) => JSX.Element | string,
  ) {
    const elements: JSX.Element[] = [];

    for (let i = 0; i < field.length; i++) {
      if (field[i]) {
        const value = callback(field[i]);
        elements.push(<span className="tag" lang={this.props.lang} key={i}>{value}</span>);
      }
    }

    if (elements.length === 0) {
      return <Translate content="language.notAvailable.field" lang={this.props.lang} />;
    }
    return elements;
  }

  private async getELSSTURLs(keywords: TermVocabAttributes[]) {
    const elsstTerms = keywords.map(k => k.term);
    const elsstURLs = await getELSSTTerm(elsstTerms, this.props.lang);

    this.setState({
      elsstURLs: elsstURLs
    });
  }

  render(): React.ReactNode {
    return (<>
      <div className="tags">
        {this.generateElements(this.state.isExpanded ? this.props.keywords : this.props.keywords.slice(0, 12),
          keywords => {
            // If the term is a valid ELSST term, link to ELSST
            const keywordTerm = upperFirst(keywords.term);
            if (this.state.elsstURLs[keywords.term]) {
              return <a href={this.state.elsstURLs[keywords.term]}>{keywordTerm}</a>
            } else {
              return <Link to={`/?keywords.term[0]=${encodeURI(keywords.term)}`}>{keywordTerm}</Link>;
            }
          }
        )}
      </div>
      {this.props.keywords.length > Keywords.truncatedKeywordsLength &&
        <a className="button is-small is-white" onClick={() =>
          // Toggle the expanded state
          this.setState(state => ({ isExpanded: !state.isExpanded }))
        }>
          {this.state.isExpanded ?
          <>
            <span className="icon is-small"><FaAngleUp/></span>
            <Translate component="span" content="readLess"/>
          </>
          :
          <>
            <span className="icon is-small"><FaAngleDown/></span>
            <Translate component="span" content="readMore"/>
          </>
          }
        </a>
      }
    </>);
  }
}
