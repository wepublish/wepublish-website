import React from 'react'
import { backgroundColorSwitch, lineColorSwitch } from '../common/DDUtil'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import NavLink from './common/NavLink'

export default class WebsiteFr extends React.Component {

  constructor(props) {
    super(props)

    this.backToTop = this.backToTop.bind(this)
  }

  backToTop() {
    window.scrollTo(0, 0);
  }

  render() {
    // BlockHome
    const createRichtTextMarkup = (content) => {
      return { __html: content };
    }

    let aspectRatio = "16:9".split(":")
    let style = {
      paddingBottom: ((aspectRatio[1] / aspectRatio[0]) * 100) + '%'
    }



    return (
      <div id="app">

        <div id="navigation-wrappter" className="">
          <div id="navigation-burger" className="navigation-burger menu-content">
            <div className="navigation-burger-wrapper">
              <div className="menu-content-wrapper">
                <div id="navigation-text" className="menu-content">
                  <a href="/">
                    <img className="navigation-logo" src={require("../static/img/wepublish_logo.svg")}></img>
                  </a>
                </div>
              </div>

              <div className="navigation-anchors">
                <div className="anchor-container">
                  <a className="anchor-link" href={"de/#" + "Vision".toLowerCase()}>Vision</a>
                </div>

                <div className="anchor-container">
                  <a className="anchor-link" href={"de/#" + "team".toLowerCase()}>Team</a>
                </div>

                <div className="anchor-container">
                  <a className="anchor-link" href={"de/#" + "Downloads".toLowerCase()}>Downloads</a>
                </div>

                <div className="anchor-container">
                  <a className="anchor-link" href={"de/#" + "kontakt".toLowerCase()}>Contact</a>
                </div>

                <div className="languages-navigation-anchors">

                  <ul className="navigation-languages">
                    <li>
                      <NavLink className={"navigation-lag"} to={"/de"}>DE</NavLink>
                    </li>

                    <li>
                      /
                    </li>

                    <li>
                      <NavLink className={"navigation-lag active"} to={"/fr"}>FR</NavLink>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="header-container">
          <div className="header-background">
            <div className="header-background block-iframe" style={style} dangerouslySetInnerHTML={createRichtTextMarkup('<iframe src="https://player.vimeo.com/video/223777835?title=0&byline=0&portrait=0" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>')} />
          </div>
        </div>

        <div className={backgroundColorSwitch('white')}>
          <div className="block-spacer spacer-desktop">
            <div className={lineColorSwitch('turquoise')} style={{ height: 120 + 'px' }}></div>
          </div>

          <div className="block-spacer spacer-mobile" style={{ height: 60 + 'px' }}>
            <div id="spacer-line-mobile" className={lineColorSwitch('turquoise')} style={{ height: 60 + 'px' }}></div>
          </div>
        </div>

        <div className={backgroundColorSwitch('white')}>
          <div className="title-wrapper">
            <a id={"Vision".toLowerCase()} className="anchor-padding"></a>
            <div className="title">
              <div className="rich-text">
                <h2>Notre vision</h2>
              </div>
            </div>

            <div className="subtitle">
              <div className="rich-text">
                <h2>Nous promouvons la diversité des médias, le journalisme de qualité et d’investigation en mettant à disposition des outils éditoriaux et une infrastructure ultramoderne. Cette dernière se base sur le principe de l’Open-Source et permet de fabriquer des contenus en collectif et avec une participation active des utilisateurs. Il s’agit d’un projet d’intérêt public et « non orienté profit ».</h2>
              </div>
            </div>
          </div>
        </div>

        <div className={backgroundColorSwitch('white')}>
          <div className="block-spacer spacer-desktop">
            <div className={lineColorSwitch('turquoise')} style={{ height: 180 + 'px' }}></div>
          </div>

          <div className="block-spacer spacer-mobile" style={{ height: 90 + 'px' }}>
            <div id="spacer-line-mobile" className={lineColorSwitch('turquoise')} style={{ height: 90 + 'px' }}></div>
          </div>
        </div>


        <div className={backgroundColorSwitch('grey')}>
          <div className="block-spacer spacer-desktop">
            <div className={lineColorSwitch('turquoise')} style={{ height: 120 + 'px' }}></div>
          </div>

          <div className="block-spacer spacer-mobile" style={{ height: 60 + 'px' }}>
            <div id="spacer-line-mobile" className={lineColorSwitch('turquoise')} style={{ height: 60 + 'px' }}></div>
          </div>
        </div>


        <div className={backgroundColorSwitch('grey')}>
          <div className="richTextTab-wrapper">
            <Tabs>
              <TabList>
                <h2>
                  <Tab>Le but</Tab>
                  <Tab>La démarche</Tab>
                  <Tab>La solution</Tab>
                  <Tab>Le bénéficiaire</Tab>
                </h2>
              </TabList>

              <TabPanel>
                <div className="rich-text">
                  <p>
                    In vielen Verlagshäusern wird massiv gespart. Fundierte Recherche bleibt aus ökonomischen Gründen oft auf der Strecke. Erfreulicherweise entstehen zwar neue journalistische Online-Angebote, diese müssen jedoch überproportional viel Geld in technische Voraussetzungen investieren. Geld, das damit nicht für Content-Erstellung zur Verfügung steht.
                  </p>
                  <br />
                  <p>
                    Eine gemeinsame Infrastruktur, auf der neue Medienmarken aufsetzen können, ist notwendig und sinnvoll. Dadurch können journalistische Angebote ihre Ressourcen auf die Produktion von Inhalten konzentrieren und sich gegenseitig unterstützen.
                  </p>
                  <br />
                  <p>
                    So entsteht ein kollaboratives und gleichzeitig kompetitives Mediensystem.
                  </p>
                </div>
              </TabPanel>
              <TabPanel>
                <div className="rich-text">Die Produktion, Distribution und Vermarktung von journalistischen Inhalten muss grundsätzlich neu organisiert werden. WePublish bietet eine Lösung, die den Anforderungen der vier wichtigsten Anspruchsgruppen in einer umfassenden Lösung zusammenbringt - Leser, Journalisten, Medienmarken und Werbetreibende. Gerade die Kombination aus journalistischer Open-Source-Plattform mit Gemeinschaftscharakter, technischer Infrastruktur und neuem Geschäftsmodell ist eine echte Alternative zur etablierten Branchenlogik und dem überholten Geschäftsmodell vieler Medien.  WePublish ermöglicht, von Synergieeffekten zu profitieren, neue Initiativen oder Geschäftsanforderungen schnell und einfach umzusetzen und so einen Beitrag dazu leisten, dass unabhängiger Journalismus und Medienvielfalt langfristig eine Chance haben. </div>
              </TabPanel>
              <TabPanel>
                <div className="rich-text">WePublish ist eine Content Intelligence Base für neue digitale Medienmarken. Journalisten und Medienschaffende können unter eigenem Brand Inhalte partizipativ erstellen und nach publizistischen Regeln veröffentlichen. Sie haben Zugang zu einer gemeinsamen, digitalen Infrastruktur mit Newsfeed, Advertising- und Zahlungssystem, Analyse-Tools und modernster Content-Distribution-Technologie. Die Kosteneinsparungen und der kollaborative Wissenstransfer, kommen zudem der Qualität und Diversität der Medienmarken, ihrer Inhalte und damit den Lesern zugute.</div>
              </TabPanel>
              <TabPanel>
                <div className="rich-text">Das Angebot richtet sich an Journalisten, die selber Publisher werden wollen - ob alleine oder mit anderen zusammen, an neue Medienmarken, sowie an kleinere und mittlere Medienhäuser, die ihre Online Präsenz ausbauen oder neu entwickeln möchten. Der Einstieg in das Online-Geschäft soll vereinfacht, die Kosten minimiert und Inhalte einem grösseren Publikum Zugänglich gemacht werden können. User profitieren von der Vielfalt und Qualität redaktioneller Inhalte, die über diverse Kanäle zugänglich gemacht werden können. Die Entscheidung darüber welche Inhalte erstellt oder welche Produkte bzw. Dienstleistungen den Usern angeboten werden sollen, obliegt den Medienmarken selbst. </div>
              </TabPanel>
            </Tabs>
          </div>
        </div>


        <div className={backgroundColorSwitch('grey')}>
          <div className="block-spacer spacer-desktop">
            <div className={lineColorSwitch('turquoise')} style={{ height: 180 + 'px' }}></div>
          </div>

          <div className="block-spacer spacer-mobile" style={{ height: 90 + 'px' }}>
            <div id="spacer-line-mobile" className={lineColorSwitch('turquoise')} style={{ height: 90 + 'px' }}></div>
          </div>
        </div>


        <div className={backgroundColorSwitch('turquoise')}>

          <div className="richText-wrapper">
            <div className="richText-content">
              <div id="padding-line-top" className={lineColorSwitch('white')}></div>
            </div>
          </div>


          <div className="richText-wrapper">
            <div className="richText-content">
              <div className="richText-block">
                <img src="https://karmarun-res.cloudinary.com/image/upload/v1498563087/wepublish/fsq63mn2gthtsembpujr.png" alt="we are not" />

                <div className="rich-text">
                  <h2>Nous sommes:</h2>
                  <br />
                  <br />
                  <p>Une plateforme Open-Source hautement innovante permettant aux médias en ligne de développer des contenus de qualité de manière libre et participative et de les commercialiser selon leurs propres critères.</p>
                  <br />
                  <p>WePublish s’oriente d’après ses propres valeurs démocratiques et d’après les  principes du journalisme.</p>
                </div>
              </div>

              <div className={lineColorSwitch('white')}></div>
              <div id="padding-line-top-mobile" className={lineColorSwitch('white')}></div>

              <div className="richText-block">
                <img src="https://karmarun-res.cloudinary.com/image/upload/v1498562970/wepublish/tlbbw51j4qcy1gnt4gkl.png" alt="we are" />

                <div className="rich-text">
                  <h2>Nous ne sommes pas:</h2>
                  <br />
                  <br />
                  <p>WePublish n’est pas un blog et pas un simple outil éditorial comme par exemple medium.com.</p>
                  <br />
                  <p>WePublish n’est pas non plus un magazine singulier comme republik.ch.</p>
                  <br />
                  <p>WePublish est la plateforme pour un réseau collectif et participatif de plusieurs offres médias.</p>
                  <br/>
                  <p>WePublish n’est pas une structure en silo et pas une black box sans visibilité sur son mode de fonctionnement, mais un système ouvert qui permet à l’utilisateur d’avoir une vision claire de ce qui se passe derrière l’interface de programmation.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="richText-wrapper">
            <div className="richText-content">
              <div id="padding-line-bottom" className={lineColorSwitch('white')}></div>
            </div>
          </div>
        </div>


        <div className={backgroundColorSwitch('black')}>
          <div className="block-spacer spacer-desktop">
            <div className={lineColorSwitch('turquoise')} style={{ height: 120 + 'px' }}></div>
          </div>

          <div className="block-spacer spacer-mobile" style={{ height: 60 + 'px' }}>
            <div id="spacer-line-mobile" className={lineColorSwitch('turquoise')} style={{ height: 60 + 'px' }}></div>
          </div>
        </div>


        <div className={backgroundColorSwitch('black')}>
          <div className="title-wrapper">
            <a id={"Team".toLowerCase()} className="anchor-padding"></a>
            <div className="title">
              <div className="rich-text">
                <h2>L’équipe</h2>
              </div>
            </div>

            <div className="subtitle">
              <div className="rich-text">
                <h2>Afin de convertir avec succès notre vision, une équipe compétente et professionnelle issue des domaines du journalisme, des médias et technologies numériques s’est réunie.</h2>
              </div>
            </div>
          </div>
        </div>


        <div className={backgroundColorSwitch('black')}>
          <div className="block-spacer spacer-desktop">
            <div className={lineColorSwitch('turquoise')} style={{ height: 113 + 'px' }}></div>
          </div>

          <div className="block-spacer spacer-mobile" style={{ height: 56 + 'px' }}>
            <div id="spacer-line-mobile" className={lineColorSwitch('turquoise')} style={{ height: 56 + 'px' }}></div>
          </div>
        </div>


        <div className={backgroundColorSwitch('black')}>
          <div className="teaserSpot-wrapper">
            <div className="teaserSpot-content">
              <div className="teaserSpot-img">
                <a href="https://www.facebook.com/WePublish.Community/">
                  <img src="https://karmarun-res.cloudinary.com/image/upload/q_60/w_279/h_279/v1498563099/wepublish/livgrxvfezhum0snbhj9.png" alt="we are" />
                </a>
              </div>
              <div className="teaserSpot-text">
                <div className="rich-text">
                  <h3>Concept / Direction</h3>
                  <br />
                  <h2>Hansi Voigt / <br />
                    Olaf Kunz /  <br />
                    François Rüf
                  </h2>
                </div>
              </div>
            </div>

            <div className="teaserSpot-content">
              <div className="teaserSpot-img">
                <a href="https://www.hinderlingvolkart.com/">
                  <img src="https://karmarun-res.cloudinary.com/image/upload/q_60/w_279/h_279/v1498563105/wepublish/zy5xg2lzdqijpb8riiif.png" alt="we are" />
                </a>
              </div>
              <div className="teaserSpot-text">
                <div className="rich-text">
                  <h3>Image de marque / Front-end</h3>
                  <br />
                  <h2>Hinderling Volkart</h2>
                </div>
              </div>
            </div>

            <div className="teaserSpot-content">
              <div className="teaserSpot-img">
                <a href="https://karma.run/">
                  <img src="https://karmarun-res.cloudinary.com/image/upload/q_60/w_279/h_279/v1498563110/wepublish/vxucjtcbbe3uwfk2deao.png" alt="we are" />
                </a>
              </div>
              <div className="teaserSpot-text">
                <div className="rich-text">
                  <h3>Exécution / Back-end</h3>
                  <br />
                  <h2>Karma.run AG</h2>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className={backgroundColorSwitch('black')}>
          <div className="block-spacer spacer-desktop">
            <div className={lineColorSwitch('turquoise')} style={{ height: 180 + 'px' }}></div>
          </div>

          <div className="block-spacer spacer-mobile" style={{ height: 90 + 'px' }}>
            <div id="spacer-line-mobile" className={lineColorSwitch('turquoise')} style={{ height: 90 + 'px' }}></div>
          </div>
        </div>


        <div className={backgroundColorSwitch('white')}>
          <div className="block-spacer spacer-desktop">
            <div className={lineColorSwitch('turquoise')} style={{ height: 120 + 'px' }}></div>
          </div>

          <div className="block-spacer spacer-mobile" style={{ height: 60 + 'px' }}>
            <div id="spacer-line-mobile" className={lineColorSwitch('turquoise')} style={{ height: 60 + 'px' }}></div>
          </div>
        </div>


        <div className={backgroundColorSwitch('white')}>
          <div className="title-wrapper">
            <a id={"Downloads".toLowerCase()} className="anchor-padding"></a>
            <div className="title">
              <div className="rich-text">
                <h2>Media / Downloads</h2>
              </div>
            </div>
          </div>
        </div>

        <div className={backgroundColorSwitch('white')}>
          <div className="download-wrapper">

            <div className="download-content">
              <div className="download-img-container">
                <a href="https://www.nzz.ch/feuilleton/medien/interview-mit-otfried-jarren-mehr-macht-fuer-den-gebuehrenzahler-ld.1304936">
                  <div className="download-img-wrapper">
                    <img className="download-arrow" src={require("../static/img/arrow_down.png")} />
                    <div className="download-img-div">
                      <img className="download-img document" src="https://karmarun-res.cloudinary.com/image/upload/q_60/v1498563110/wepublish/ifx9np1xkty0kcrqcynb.png" alt="document" />
                    </div>
                  </div>
                </a>
              </div>
              <div className="download-text">
                <div className="rich-text">
                  <a href="https://www.nzz.ch/feuilleton/medien/interview-mit-otfried-jarren-mehr-macht-fuer-den-gebuehrenzahler-ld.1304936">
                    <p>Media</p>
                    <p>Interview</p>
                  </a>
                </div>
              </div>
            </div>

            <div className={lineColorSwitch('turquoise')}></div>

            <div className="download-content">
              <div className="download-img-container">
                <a href="https://docs.google.com/document/d/1AiJ5i7F8IVPkf2HO75SN7888XA-RvpgnASNn9K0jp6Q/edit">
                  <div className="download-img-wrapper">
                    <img className="download-arrow" src={require("../static/img/arrow_down.png")} />
                    <div className="download-img-div">
                      <img className="download-img folder" src="https://karmarun-res.cloudinary.com/image/upload/q_60/v1498563110/wepublish/qwiuukwgxvktt3kmixyz.png" alt="folder" />
                    </div>
                  </div>
                </a>
              </div>
              <div className="download-text">
                <div className="rich-text">
                  <a href="https://docs.google.com/document/d/1AiJ5i7F8IVPkf2HO75SN7888XA-RvpgnASNn9K0jp6Q/edit">
                    <p>Download</p>
                    <p>Questions et réponses</p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className={backgroundColorSwitch('white')}>
          <div className="block-spacer spacer-desktop">
            <div className={lineColorSwitch('turquoise')} style={{ height: 120 + 'px' }}></div>
          </div>

          <div className="block-spacer spacer-mobile" style={{ height: 60 + 'px' }}>
            <div id="spacer-line-mobile" className={lineColorSwitch('turquoise')} style={{ height: 60 + 'px' }}></div>
          </div>
        </div>

        <div className={backgroundColorSwitch('turquoise')}>
          <div className="block-spacer spacer-desktop">
            <div className={lineColorSwitch('white')} style={{ height: 120 + 'px' }}></div>
          </div>

          <div className="block-spacer spacer-mobile" style={{ height: 60 + 'px' }}>
            <div id="spacer-line-mobile" className={lineColorSwitch('white')} style={{ height: 60 + 'px' }}></div>
          </div>
        </div>

        <div className={backgroundColorSwitch('turquoise')}>
          <div className="title-wrapper">
            <a id={"Kontakt".toLowerCase()} className="anchor-padding"></a>
            <div className="title">
              <div className="rich-text">
                <h2>Contact</h2>
              </div>
            </div>

            <div className="subtitle">
              <div className="rich-text">
                <h2>Soutenez le projet et contactez-nous.</h2>
              </div>
            </div>
          </div>
        </div>

        <div className={backgroundColorSwitch('turquoise')}>
          <div className="contact-wrapper">
            <div className="contact-img-content">
              <a href="mailto:info@wepublish.media">
                <div className="contact-img-wrapper">
                  <img className="contact-arrow" src={require("../static/img/arrow-right.png")} />
                  <img className="contact-img" src="https://karmarun-res.cloudinary.com/image/upload/q_60/v1498563110/wepublish/nkip3lnf3knru2yki5nl.png" alt="contact" />
                </div>
              </a>
            </div>
            <div className="contact-text">
              <div className="rich-text">
                <p>Envoyez un courriel à <a href="mailto:info@wepublish.media">info@wepublish.media</a></p>
              </div>
            </div>
          </div>
        </div>

        <div className={backgroundColorSwitch('turquoise')}>
          <div className="block-spacer spacer-desktop">
            <div className={lineColorSwitch('white')} style={{ height: 120 + 'px' }}></div>
          </div>

          <div className="block-spacer spacer-mobile" style={{ height: 60 + 'px' }}>
            <div id="spacer-line-mobile" className={lineColorSwitch('white')} style={{ height: 60 + 'px' }}></div>
          </div>
        </div>

        <div className={backgroundColorSwitch('white')}>
          <div className="block-spacer spacer-desktop">
            <div className={lineColorSwitch('turquoise')} style={{ height: 120 + 'px' }}></div>
          </div>

          <div className="block-spacer spacer-mobile" style={{ height: 60 + 'px' }}>
            <div id="spacer-line-mobile" className={lineColorSwitch('turquoise')} style={{ height: 60 + 'px' }}></div>
          </div>
        </div>


        <div className={backgroundColorSwitch('white')}>
          <div className="title-wrapper">
            <a id={"Kontakt".toLowerCase()} className="anchor-padding"></a>
            <div className="title">
              <div className="rich-text">
                <h2>Community</h2>
              </div>
            </div>

            <div className="subtitle">
              <div className="rich-text">
                <p>Soutiens le projet - deviens ambassadeur pour la bonne cause, rejoins notre groupe sur <a href="https://www.facebook.com/WePublish.Community/">Facebook</a> et participe activement avec tes idées.</p>
              </div>
            </div>
          </div>
        </div>

        <div className={backgroundColorSwitch('white')}>
          <div className="block-spacer spacer-desktop">
            <div className={lineColorSwitch('turquoise')} style={{ height: 120 + 'px' }}></div>
          </div>

          <div className="block-spacer spacer-mobile" style={{ height: 60 + 'px' }}>
            <div id="spacer-line-mobile" className={lineColorSwitch('turquoise')} style={{ height: 60 + 'px' }}></div>
          </div>
        </div>

        <footer id="footer">
          <div className="footer-wrapper">
            <div className="footer-left">
              <h3>© Copyright 2017 | we.publish</h3>
            </div>

            <div className="footer-center">
              <h3>karma.run INSIDE</h3>
            </div>

            <div className="footer-right" onClick={this.backToTop}>
              <h3>Back to top</h3>
              <img className="footer-img" src="https://karmarun-res.cloudinary.com/image/upload/q_60/v1498563126/wepublish/cfivkg1bat4gp0ocuupf.png" alt="back to top" />
            </div>
          </div>
        </footer>

      </div>
    )
  }
}

