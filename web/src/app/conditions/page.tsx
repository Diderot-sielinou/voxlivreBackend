import type { Metadata } from 'next';
import Link from 'next/link';

import { LegalPage, type LegalSection } from '@/components/legal-page';
import { CONTACT_EMAIL } from '@/content/site';

export const metadata: Metadata = {
  title: 'Conditions d’utilisation',
  description: 'Les règles d’utilisation de Voxlivre : compte, documents importés, unités, offres.',
  alternates: { canonical: '/conditions' },
};

const SECTIONS: readonly LegalSection[] = [
  { id: 'service', title: '1. Le service' },
  { id: 'compte', title: '2. Votre compte' },
  { id: 'documents', title: '3. Vos documents' },
  { id: 'offres', title: '4. Gratuit et offres' },
  { id: 'disponibilite', title: '5. Disponibilité' },
  { id: 'suspension', title: '6. Suspension et suppression' },
  { id: 'responsabilite', title: '7. Responsabilité' },
  { id: 'droit', title: '8. Modifications et droit' },
  { id: 'contact', title: 'Contact' },
];

const mail = <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>;

export default function ConditionsPage() {
  return (
    <LegalPage
      title="Conditions d’utilisation"
      intro="Ce que vous pouvez attendre de Voxlivre, et ce que nous attendons de vous."
      updated="17 octobre 2026"
      sections={SECTIONS}
    >
      <h2 id="service">1. Le service</h2>
      <p>
        Voxlivre, édité par Sielinou Fonou Diderot, Yaoundé, Cameroun, permet de transformer un
        document PDF en livre audio dont le texte est surligné mot à mot pendant l’écoute. En créant
        un compte, vous acceptez les présentes conditions et la{' '}
        <Link href="/confidentialite">politique de confidentialité</Link>.
      </p>

      <h2 id="compte">2. Votre compte</h2>
      <p>
        Vous vous connectez avec votre compte Google, ou avec votre numéro de téléphone ou votre
        adresse e-mail, par un code à usage unique. Vous êtes responsable de l’usage de votre compte
        et ne devez pas partager vos codes de connexion. Un seul compte par personne.
      </p>

      <h2 id="documents">3. Les documents que vous importez</h2>
      <p>Avant chaque import, vous déclarez que :</p>
      <ul>
        <li>vous êtes l’auteur du document ou titulaire des droits nécessaires, ou</li>
        <li>
          le document est libre de droits, ou vous l’avez acquis légalement et l’utilisez pour votre
          usage strictement personnel et privé.
        </li>
      </ul>
      <p>
        Voxlivre est un outil de lecture personnelle, pas une bibliothèque ni un service de partage.
        Le PDF importé est supprimé dès que son texte est extrait ; le texte et l’audio produits ne
        sont accessibles qu’à vous. Vous restez seul responsable du contenu que vous importez. Il
        est interdit d’importer un contenu illicite et de diffuser, revendre ou partager
        publiquement l’audio produit à partir d’une œuvre dont vous ne détenez pas les droits.
      </p>
      <p>
        Un titulaire de droits qui estime qu’un contenu porte atteinte à ses droits peut nous écrire
        à {mail}.
      </p>

      <h2 id="offres">4. Palier gratuit et offres payantes</h2>
      <p>
        L’usage est compté en unités : un caractère lu par une voix standard vaut une unité, par une
        voix naturelle quatre unités. Un palier gratuit est renouvelé chaque mois civil pour les
        voix standard. Au-delà, des pass de 30 jours et des crédits sans date d’expiration sont
        proposés ; leur prix et leur contenu sont affichés dans l’application avant tout achat. Le
        paiement par Mobile Money n’est pas encore ouvert : les conditions de paiement et de
        remboursement seront ajoutées ici avant son ouverture.
      </p>
      <p>Si une conversion échoue, les unités non consommées vous sont rendues automatiquement.</p>

      <h2 id="disponibilite">5. Disponibilité</h2>
      <p>
        Nous faisons notre possible pour que le service soit disponible et fiable, sans pouvoir le
        garantir en permanence. Le service peut être interrompu pour maintenance. La qualité de
        l’extraction du texte dépend du document importé : vous pouvez corriger le texte avant la
        synthèse vocale.
      </p>

      <h2 id="suspension">6. Suspension et suppression</h2>
      <p>
        Vous pouvez supprimer vos documents et votre compte à tout moment depuis l’application, ou
        demander la suppression du compte par e-mail (voir{' '}
        <Link href="/supprimer-compte">Supprimer mon compte</Link>). Les pass et crédits restants
        sont alors perdus, sans remboursement. Nous pouvons suspendre un compte en cas de fraude,
        d’abus manifeste du service ou de non-respect de ces conditions.
      </p>

      <h2 id="responsabilite">7. Responsabilité</h2>
      <p>
        Voxlivre ne peut être tenu responsable d’un usage du service contraire à ces conditions, ni
        des dommages indirects liés à une indisponibilité. Rien dans ces conditions ne limite les
        droits que la loi vous garantit en tant que consommateur.
      </p>

      <h2 id="droit">8. Modifications et droit applicable</h2>
      <p>
        Ces conditions peuvent évoluer ; la version en vigueur est celle publiée sur cette page,
        datée en haut. En cas de changement important, vous serez informé dans l’application. Ces
        conditions sont régies par le droit camerounais.
      </p>

      <h2 id="contact">Contact</h2>
      <p>{mail}</p>
    </LegalPage>
  );
}
