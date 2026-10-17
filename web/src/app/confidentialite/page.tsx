import type { Metadata } from 'next';
import Link from 'next/link';

import { LegalPage, type LegalSection } from '@/components/legal-page';
import { CONTACT_EMAIL } from '@/content/site';

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description:
    'Quelles données Voxlivre collecte, pourquoi, combien de temps, et comment exercer vos droits.',
  alternates: { canonical: '/confidentialite' },
};

const SECTIONS: readonly LegalSection[] = [
  { id: 'responsable', title: 'Responsable du traitement' },
  { id: 'en-bref', title: 'En bref' },
  { id: 'donnees', title: 'Les données traitées' },
  { id: 'base-legale', title: 'Base légale' },
  { id: 'acces', title: 'Qui y a accès' },
  { id: 'securite', title: 'Sécurité' },
  { id: 'droits', title: 'Vos droits' },
  { id: 'modifications', title: 'Modifications' },
];

const DATA: readonly (readonly [string, string, string])[] = [
  [
    'Numéro de téléphone ou adresse e-mail',
    'Créer votre compte et vous connecter par un code à usage unique',
    'Tant que le compte existe',
  ],
  [
    'Avec la connexion Google : nom, adresse e-mail, lien de la photo de profil et identifiant du compte Google (aucun mot de passe ni jeton d’accès)',
    'Créer votre compte et vous connecter avec Google',
    'Tant que le compte existe',
  ],
  [
    'Code de connexion (enregistré sous forme chiffrée irréversible)',
    'Vérifier votre identité',
    '5 minutes',
  ],
  [
    'Journal des envois de codes (destinataire enregistré sous forme d’empreinte)',
    'Limiter les abus (nombre de codes par heure)',
    '2 jours',
  ],
  [
    'Session : adresse IP et type d’appareil ou de navigateur',
    'Sécuriser votre connexion',
    '30 jours, ou jusqu’à la déconnexion',
  ],
  [
    'Adresse IP (compteurs anti-abus)',
    'Bloquer les tentatives de connexion répétées',
    'Quelques minutes',
  ],
  [
    'Fichier PDF importé',
    'En extraire le texte',
    'Supprimé dès l’extraction ; au plus 3 jours en cas d’échec',
  ],
  [
    'Titre, texte extrait et corrections que vous y apportez',
    'Produire l’audio et afficher le texte synchronisé',
    'Jusqu’à la suppression du document ou du compte',
  ],
  [
    'Fichiers audio et de synchronisation',
    'Vous permettre d’écouter, y compris hors connexion',
    'Jusqu’à la suppression du document ou du compte',
  ],
  [
    'Marque-pages et notes personnelles',
    'Retrouver un passage, sur tous vos appareils',
    'Jusqu’à leur suppression, celle du document ou du compte',
  ],
  [
    'Position de lecture',
    'Reprendre là où vous vous êtes arrêté, sur tous vos appareils',
    'Jusqu’à la suppression du document ou du compte',
  ],
  [
    'Consommation, pass et crédits',
    'Appliquer le palier gratuit et vos offres',
    'Jusqu’à la suppression du compte',
  ],
  [
    'Paiements : montant, offre, date, référence de la transaction, 3 derniers chiffres du numéro payeur',
    'Obligations comptables, litiges',
    '10 ans ; détachés du compte s’il est supprimé',
  ],
  [
    'Journaux techniques (méthode, adresse demandée, statut, sans IP ni identifiant)',
    'Diagnostiquer les pannes',
    '7 jours',
  ],
];

const mail = <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>;

export default function ConfidentialitePage() {
  return (
    <LegalPage
      title="Politique de confidentialité"
      intro="Quelles données personnelles Voxlivre traite, pourquoi, pendant combien de temps, et comment exercer vos droits."
      updated="17 octobre 2026"
      sections={SECTIONS}
    >
      <p className="callout">
        Voxlivre est une application qui transforme des documents PDF en livres audio synchronisés
        avec le texte. Cette page explique quelles données personnelles nous traitons, pourquoi,
        pendant combien de temps, et comment exercer vos droits, conformément à la loi camerounaise
        n° 2024/017 du 23 décembre 2024 relative à la protection des données à caractère personnel.
      </p>

      <h2 id="responsable">Responsable du traitement</h2>
      <p>Voxlivre, édité par Sielinou Fonou Diderot, Yaoundé, Cameroun. Contact : {mail}.</p>

      <h2 id="en-bref">En bref</h2>
      <ul>
        <li>Nous collectons le strict nécessaire pour faire fonctionner le service.</li>
        <li>Votre PDF est supprimé dès que son texte est extrait.</li>
        <li>Pas de publicité, pas de traceur, pas de revente de données.</li>
        <li>Vous pouvez demander à tout moment l’accès à vos données ou leur suppression.</li>
      </ul>

      <h2 id="donnees">Les données que nous traitons</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th scope="col">Donnée</th>
              <th scope="col">Pourquoi</th>
              <th scope="col">Durée de conservation</th>
            </tr>
          </thead>
          <tbody>
            {DATA.map(([what, why, how]) => (
              <tr key={what}>
                <td data-label="Donnée">{what}</td>
                <td data-label="Pourquoi">{why}</td>
                <td data-label="Conservation">{how}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        Pour éviter de refaire une synthèse vocale identique, un fichier audio peut être conservé
        sous un identifiant calculé à partir du texte et de la voix, sans lien avec votre compte.
      </p>
      <p>
        Nous n’utilisons ni cookie publicitaire, ni outil de mesure d’audience, ni traceur, sur ce
        site comme dans l’application.
      </p>

      <h2 id="base-legale">Base légale</h2>
      <p>
        Ces traitements sont nécessaires à l’exécution du service que vous demandez en créant un
        compte (<Link href="/conditions">conditions d’utilisation</Link>), et, pour la lutte contre
        les abus et la sécurité, à notre intérêt légitime à protéger le service et ses utilisateurs.
      </p>

      <h2 id="acces">Qui y a accès</h2>
      <p>
        Vos données ne sont ni vendues ni louées. Elles sont traitées par des prestataires
        techniques, uniquement pour faire fonctionner le service :
      </p>
      <ul>
        <li>
          <strong>Amazon Web Services</strong> (région de Paris, France) : hébergement, stockage des
          fichiers, synthèse vocale (Amazon Polly) et envoi des e-mails de connexion (Amazon SES).
        </li>
        <li>
          <strong>Google</strong> : connexion avec votre compte Google, si vous la choisissez.
          Google nous transmet votre nom, votre adresse e-mail et le lien de votre photo de profil.
        </li>
        <li>
          <strong>Orange Cameroun</strong> : envoi des codes de connexion par SMS.
        </li>
      </ul>
      <p>
        Vos données sont donc hébergées hors du Cameroun, en France, chez un prestataire tenu par
        contrat à des obligations de sécurité et de confidentialité. Le paiement par Mobile Money,
        quand il sera disponible, fera intervenir un prestataire de paiement : cette page sera mise
        à jour avant.
      </p>

      <h2 id="securite">Sécurité</h2>
      <ul>
        <li>Toutes les communications sont chiffrées (HTTPS).</li>
        <li>Les fichiers sont stockés dans un espace privé, accessible par liens temporaires.</li>
        <li>
          Les codes de connexion et les destinataires des envois sont enregistrés sous forme
          d’empreinte.
        </li>
        <li>Les journaux techniques masquent les numéros, adresses e-mail, codes et jetons.</li>
      </ul>

      <h2 id="droits">Vos droits</h2>
      <p>Vous pouvez à tout moment :</p>
      <ul>
        <li>accéder à vos données et en obtenir une copie ;</li>
        <li>les faire rectifier ;</li>
        <li>
          supprimer un document depuis l’application (texte, audio et position sont effacés) ;
        </li>
        <li>
          supprimer votre compte et toutes ses données, depuis l’application ou par e-mail (voir{' '}
          <Link href="/supprimer-compte">Supprimer mon compte</Link>) : les fichiers sont effacés en
          moins d’une minute, les copies de sauvegarde en 7 jours au plus ;
        </li>
        <li>vous opposer à un traitement ou en demander la limitation.</li>
      </ul>
      <p>
        Écrivez à {mail} depuis l’adresse ou en indiquant le numéro de votre compte. Nous répondons
        sous 30 jours. Si vous estimez que vos droits ne sont pas respectés, vous pouvez saisir
        l’autorité de protection des données à caractère personnel prévue par la loi n° 2024/017.
      </p>

      <h2 id="modifications">Modifications</h2>
      <p>
        Nous mettrons cette page à jour à chaque nouvelle donnée collectée ou nouveau prestataire.
        La date en haut de page indique la dernière version.
      </p>
    </LegalPage>
  );
}
