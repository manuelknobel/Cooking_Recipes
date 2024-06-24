import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="container mt-5">
      <div className="row">
        <div className="col-lg-8">
          <h1 className="mb-4">About the Website</h1>
          <p className="lead">
            Herrzlich willkommen auf unserer Webseite. Hier können sie alles was sie begehren bezüglich essen finden.
            Finden Sie ihren Wunsch nicht? Dann können Sie <a href="/recipes/create-recipes">Hier</a> Ihr Rezept erfassen,
            um Anderen Personen die diese Webseite besuchen Ihr Rezept sehen und ausprobieren können.
          </p>
          <div className="mb-4">
            <Image
              src="/images/pancakes.gif"
              width={800}
              height={450}
              alt="Food preparation gif"
              className="img-fluid rounded"
            />
          </div>
        </div>
        <div className="col-lg-4">
          <h2 className="mb-4">Navigation</h2>
          <div className="list-group">
            <Link href="/profile" className="list-group-item list-group-item-action">
              <h5 className="mb-1">Profil</h5>
              <p className="mb-1">
                Hier finden Sie Ihr Profil. Falls Sie noch keinen Account besitzen oder noch nicht
                eingeloggt sind, können Sie das ebenfalls hier tun.
              </p>
              <small className="text-muted">Gehe zu Ihrem Profil</small>
            </Link>
            <Link href="/recipes" className="list-group-item list-group-item-action">
              <h5 className="mb-1">Rezepte</h5>
              <p className="mb-1">
                Hier finden Sie die Rezept Seite bei der Sie alle möglichen von Usern erfassten
                Rezepte finden können.
              </p>
              <small className="text-muted">Alle Rezepte ansehen</small>
            </Link>
            <Link href="/recipes/create-recipes" className="list-group-item list-group-item-action">
              <h5 className="mb-1">Rezepte Erstellen</h5>
              <p className="mb-1">
                Wenn Sie Rezepte erstellen wollen, können Sie dies hier tun.
              </p>
              <small className="text-muted">Neues Rezept erstellen</small>
            </Link>
            <Link href="/recipes/saved-recipes" className="list-group-item list-group-item-action">
              <h5 className="mb-1">Gespeicherte Rezepte</h5>
              <p className="mb-1">
                Die von Ihnen gespeicherten Rezepte finden Sie hier.
              </p>
              <small className="text-muted">Gespeicherte Rezepte ansehen</small>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
