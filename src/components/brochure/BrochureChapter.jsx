import { brochureMeta } from "../../data/brochure";

const Block = ({ block }) => {
  if (!block) return null;

  return (
    <div className="site-brochure-block">
      {block.kicker && <p className="site-brochure-kicker">{block.kicker}</p>}
      {block.title && (
        <h3 className="site-brochure-block-title font-display">{block.title}</h3>
      )}
      {block.body?.map((p) => (
        <p key={p.slice(0, 40)} className="site-brochure-copy">
          {p}
        </p>
      ))}
      {block.bullets?.length > 0 && (
        <ul className="site-brochure-list">
          {block.bullets.map((item) => (
            <li key={item.slice(0, 40)}>{item}</li>
          ))}
        </ul>
      )}
      {block.sections?.map((sec) => (
        <div key={sec.title} className="site-brochure-section">
          <h4 className="site-brochure-section-title font-display">{sec.title}</h4>
          {sec.body && <p className="site-brochure-copy">{sec.body}</p>}
        </div>
      ))}
      {block.values?.length > 0 && (
        <ul className="site-brochure-values">
          {block.values.map((v) => (
            <li key={v.name}>
              <span className="site-brochure-value-name">{v.name}</span>
              <span className="site-brochure-value-text">{v.text}</span>
            </li>
          ))}
        </ul>
      )}
      {block.note && <p className="site-brochure-note">{block.note}</p>}
    </div>
  );
};

const ChapterShell = ({ chapter, className = "", children }) => (
  <article
    className={`site-brochure-chapter ${className}`.trim()}
    data-chapter={chapter.id}
    data-tone={chapter.tone || "azure"}
  >
    <div className="site-brochure-chapter-aura" aria-hidden />
    <div className="site-brochure-chapter-orb is-a" aria-hidden />
    <div className="site-brochure-chapter-orb is-b" aria-hidden />
    {children}
  </article>
);

const BrochureChapter = ({ chapter }) => {
  if (!chapter) return null;

  if (chapter.type === "cover") {
    return (
      <ChapterShell chapter={chapter} className="is-cover">
        <div className="site-brochure-cover-plate" aria-hidden />
        <p className="site-brochure-cover-edition">Company profile · 2026</p>
        <div className="site-brochure-cover-mark" aria-hidden>
          <span />
        </div>
        <div className="site-brochure-cover-body">
          <p className="site-brochure-cover-brand font-display">
            {brochureMeta.brand}
          </p>
          <p className="site-brochure-cover-sub">{brochureMeta.subBrand}</p>
          <p className="site-brochure-cover-tag">{brochureMeta.tagline}</p>
          <p className="site-brochure-cover-support">{brochureMeta.support}</p>
        </div>
        <div className="site-brochure-cover-foot">
          <a href={`mailto:${brochureMeta.email}`}>{brochureMeta.email}</a>
          <span>Scroll to begin →</span>
        </div>
      </ChapterShell>
    );
  }

  if (chapter.type === "close") {
    return (
      <ChapterShell chapter={chapter} className="is-close">
        <div className="site-brochure-cover-plate" aria-hidden />
        <p className="site-brochure-cover-edition">Back cover · Fin</p>
        <div className="site-brochure-cover-mark" aria-hidden>
          <span />
        </div>
        <div className="site-brochure-cover-body">
          <p className="site-brochure-cover-brand font-display">
            {brochureMeta.brand}
          </p>
          <p className="site-brochure-cover-sub">{brochureMeta.subBrand}</p>
          <p className="site-brochure-cover-tag">{brochureMeta.tagline}</p>
          <p className="site-brochure-cover-support">
            Let’s build what’s next — projects, partnerships, and product builds.
          </p>
          <dl className="site-brochure-cover-meta">
            <div>
              <dt>Company</dt>
              <dd>{brochureMeta.company}</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>
                {brochureMeta.legalStatus} · {brochureMeta.headquarters}
              </dd>
            </div>
          </dl>
        </div>
        <div className="site-brochure-cover-foot">
          <a href={`mailto:${brochureMeta.email}`}>{brochureMeta.email}</a>
          <span>← End of profile</span>
        </div>
      </ChapterShell>
    );
  }

  if (chapter.type === "contact") {
    return (
      <ChapterShell chapter={chapter} className="is-contact">
        <div className="site-brochure-chapter-main">
          <p className="site-brochure-index font-display">{chapter.index}</p>
          <p className="site-brochure-kicker">{chapter.kicker}</p>
          <h2 className="site-brochure-title font-display">{chapter.title}</h2>
          {chapter.body?.map((p) => (
            <p key={p.slice(0, 40)} className="site-brochure-copy">
              {p}
            </p>
          ))}
          <div className="site-brochure-contact">
            <a href={`mailto:${brochureMeta.email}`}>{brochureMeta.email}</a>
            <a href={brochureMeta.phoneHref}>{brochureMeta.phone}</a>
            <a href={brochureMeta.webHref} target="_blank" rel="noreferrer">
              {brochureMeta.web}
            </a>
          </div>
        </div>
        <aside className="site-brochure-chapter-aside">
          <p className="site-brochure-kicker">Closing</p>
          <h3 className="site-brochure-block-title font-display">
            {chapter.thankYou.title}
          </h3>
          {chapter.thankYou.body.map((p) => (
            <p key={p.slice(0, 40)} className="site-brochure-copy">
              {p}
            </p>
          ))}
        </aside>
      </ChapterShell>
    );
  }

  const isCapabilities = chapter.id === "capabilities";
  const asideSections = isCapabilities ? chapter.aside?.sections : null;
  const asideBlock =
    chapter.aside && isCapabilities
      ? { ...chapter.aside, sections: undefined }
      : chapter.aside;

  return (
    <ChapterShell
      chapter={chapter}
      className={`is-editorial${isCapabilities ? " is-capabilities" : ""}`}
    >
      <div className="site-brochure-chapter-main">
        <p className="site-brochure-index font-display">{chapter.index}</p>
        <p className="site-brochure-kicker">{chapter.kicker}</p>
        <h2 className="site-brochure-title font-display">{chapter.title}</h2>
        {chapter.lead && (
          <p className="site-brochure-lead font-display">{chapter.lead}</p>
        )}
        {chapter.body?.map((p) => (
          <p key={p.slice(0, 40)} className="site-brochure-copy">
            {p}
          </p>
        ))}
        {chapter.bullets?.length > 0 && (
          <ul className="site-brochure-list">
            {chapter.bullets.map((item) => (
              <li key={item.slice(0, 40)}>{item}</li>
            ))}
          </ul>
        )}
        {chapter.note && <p className="site-brochure-note">{chapter.note}</p>}
      </div>
      {asideBlock && (
        <aside className="site-brochure-chapter-aside">
          <Block block={asideBlock} />
        </aside>
      )}
      {asideSections?.length > 0 && (
        <div className="site-brochure-chapter-foot">
          {asideSections.map((sec) => (
            <div key={sec.title} className="site-brochure-section">
              <h4 className="site-brochure-section-title font-display">
                {sec.title}
              </h4>
              {sec.body && <p className="site-brochure-copy">{sec.body}</p>}
            </div>
          ))}
        </div>
      )}
    </ChapterShell>
  );
};

export default BrochureChapter;
