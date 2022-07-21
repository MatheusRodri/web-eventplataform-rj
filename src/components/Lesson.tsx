import { CheckCircle, Lock } from 'phosphor-react';
import { isPast, format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { Link, useParams } from 'react-router-dom';
import classnames from 'classnames';
import { is } from 'date-fns/locale';
import classNames from 'classnames';

interface LessonProps {
    title: string;
    slug: string;
    avaliableAt: Date;
    type: 'live' | 'class';
}

export function Lesson(props: LessonProps) {

    const { slug } = useParams<{ slug: string }>()
    const isLessonAvailable = isPast(props.avaliableAt);
    const availableDateFormat = format(props.avaliableAt, "EEEE' • 'd' de ' MMMM' • 'k'h'mm", {
        locale: ptBR

    })

    const isActivelesson = slug === props.slug;

    return (
        <Link to={`/event/lesson/${props.slug}`} className='group'>
            <span className="text-gray-300">
                {availableDateFormat}
            </span>

            <div className={classnames('rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500', {
                'bg-green-500': isActivelesson,
            })} >
                <header className="flex items-center justify-between">
                    {
                        isLessonAvailable ? (
                            <span className={classnames('text-sm font-medium flex items-center gap-2', {
                                'text-white': isActivelesson,
                                ' text-blue-500': !isActivelesson
                            })}>
                                <CheckCircle size={20} />
                                Conteúdo liberado
                            </span>
                        )
                            :
                            (
                                <span className="text-sm text-orange-500 font-medium flex items-center gap-2">
                                    <Lock size={20} />
                                    Em breve
                                </span>
                            )
                    }

                    <span className={classNames('text-xs rounded py-[0.125rem] px-2 text-white border  font-bold', {
                        'border-white': isActivelesson,
                        'border-green-300': !isActivelesson
                    })}>
                        {
                            props.type === 'live' ? 'AO VIVO' : 'AULA PRÁTICA'
                        }
                    </span>

                </header>

                <strong className={classnames('mt-5 block', {
                    'text-white': isActivelesson,
                    'text-gray-300': !isActivelesson
                })}>
                    {props.title}
                </strong>
            </div>
        </Link>
    )
}