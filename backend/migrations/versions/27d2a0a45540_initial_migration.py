"""Initial migration

Revision ID: 27d2a0a45540
Revises: 
Create Date: 2024-10-21 07:49:49.224906

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '27d2a0a45540'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('photo')
    op.drop_table('album')
    op.drop_table('user')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
   
    # created tables in reverse order
    op.create_table('user',
        sa.Column('id', sa.INTEGER(), server_default=sa.text("nextval('user_id_seq'::regclass)"), autoincrement=True, nullable=False),
        sa.Column('name', sa.VARCHAR(length=100), autoincrement=False, nullable=False),
        sa.Column('username', sa.VARCHAR(length=100), autoincrement=False, nullable=False),
        sa.Column('email', sa.VARCHAR(length=100), autoincrement=False, nullable=False),
        sa.PrimaryKeyConstraint('id', name='user_pkey'),
        sa.UniqueConstraint('email', name='user_email_key'),
        sa.UniqueConstraint('username', name='user_username_key'),
        postgresql_ignore_search_path=False
    )
    
    op.create_table('album',
        sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
        sa.Column('user_id', sa.INTEGER(), autoincrement=False, nullable=False),
        sa.Column('title', sa.VARCHAR(length=100), autoincrement=False, nullable=False),
        sa.ForeignKeyConstraint(['user_id'], ['user.id'], name='album_user_id_fkey'),
        sa.PrimaryKeyConstraint('id', name='album_pkey')
    )

    op.create_table('photo',
        sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
        sa.Column('album_id', sa.INTEGER(), autoincrement=False, nullable=False),
        sa.Column('title', sa.VARCHAR(length=100), autoincrement=False, nullable=False),
        sa.Column('url', sa.VARCHAR(length=200), autoincrement=False, nullable=False),
        sa.ForeignKeyConstraint(['album_id'], ['album.id'], name='photo_album_id_fkey'),
        sa.PrimaryKeyConstraint('id', name='photo_pkey')
    )
    # ### end Alembic commands ###
